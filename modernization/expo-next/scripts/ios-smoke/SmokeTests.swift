import XCTest

/// Validates the five-card synthetic app through localhost Metro on a disposable iPhone.
/// Generate this standalone runner outside the protected application native projects.
final class SmokeTests: XCTestCase {
  override func setUpWithError() throws {
    continueAfterFailure = false
  }

  private func capture(_ name: String) {
    let attachment = XCTAttachment(screenshot: XCUIScreen.main.screenshot())
    attachment.name = name
    attachment.lifetime = .keepAlways
    add(attachment)
  }

  private func scrollTo(_ element: XCUIElement, in app: XCUIApplication, up: Bool = true) {
    for _ in 0..<8 {
      if element.isHittable { return }
      if up { app.scrollViews.firstMatch.swipeUp() }
      else { app.scrollViews.firstMatch.swipeDown() }
    }
    XCTAssertTrue(element.isHittable, "Expected visible element: \(element)\n\(app.debugDescription)")
  }

  func testSyntheticIPhoneSmoke() throws {
    let app = XCUIApplication(bundleIdentifier: "com.dvale1994.kyrshasapp")
    app.launchArguments = ["-RCT_jsLocation", "localhost:8081"]
    let device = XCUIDevice.shared
    device.orientation = .portrait
    app.launch()

    let quote = app.staticTexts.matching(identifier: "“Small steps can open new paths.”").firstMatch
    let nextQuote = app.staticTexts.matching(identifier: "“Make room for a little curiosity.”").firstMatch
    let trivia = app.staticTexts.matching(identifier: "TRIVIA").firstMatch
    let finalCard = app.staticTexts.matching(identifier: "Make a paper boat and invent a story for its voyage.").firstMatch
    let show = app.buttons["Show Answer"]
    let hide = app.buttons["Hide Answer"]

    XCTAssertTrue(quote.waitForExistence(timeout: 60), app.debugDescription)
    XCTAssertTrue(quote.isHittable)
    XCTAssertTrue(app.staticTexts["Offline demo · synthetic content"].exists)
    // Attribution is static text, not a tappable control; inspect its visible screenshot too.
    XCTAssertTrue(app.staticTexts.matching(identifier: "- Demo Author").firstMatch.exists)
    capture("01-first-card-synthetic-home")
    app.buttons["Refresh quote"].tap()
    XCTAssertTrue(nextQuote.waitForExistence(timeout: 5))
    XCTAssertFalse(quote.exists)
    capture("02-quote-refreshed")

    scrollTo(show, in: app)
    XCTAssertTrue(trivia.exists)
    XCTAssertFalse(hide.exists)
    capture("03-trivia-answer-hidden")
    show.tap()
    XCTAssertTrue(hide.waitForExistence(timeout: 5))
    XCTAssertTrue(app.staticTexts["Three sides."].exists)
    capture("04-trivia-answer-shown")
    hide.tap()
    XCTAssertTrue(show.waitForExistence(timeout: 5))
    XCTAssertFalse(app.staticTexts["Three sides."].exists)
    app.buttons["Refresh trivia"].tap()
    XCTAssertTrue(app.staticTexts["How many corners does a square have?"].waitForExistence(timeout: 5))
    XCTAssertFalse(app.staticTexts["Four corners."].exists)
    show.tap()
    XCTAssertTrue(app.staticTexts["Four corners."].waitForExistence(timeout: 5))
    capture("05-new-trivia-answer")
    hide.tap()

    scrollTo(finalCard, in: app)
    XCTAssertTrue(app.staticTexts["BUCKET LIST ITEM"].exists)
    XCTAssertTrue(app.buttons["Refresh bucket list item"].isHittable)
    capture("06-final-card-after-scroll")
    device.orientation = .landscapeLeft
    let settled = XCTNSPredicateExpectation(
      predicate: NSPredicate { _, _ in finalCard.isHittable }, object: nil)
    XCTAssertEqual(XCTWaiter.wait(for: [settled], timeout: 10), .completed)
    let frame = app.windows.element(boundBy: 0).frame
    XCTAssertLessThan(frame.width, frame.height, "Home must remain portrait after landscape request")
    capture("07-portrait-after-landscape-request")
    device.orientation = .portrait

    app.terminate()
    app.launch()
    XCTAssertTrue(quote.waitForExistence(timeout: 30))
    XCTAssertTrue(quote.isHittable)
    scrollTo(show, in: app)
    XCTAssertTrue(app.staticTexts["How many sides does a triangle have?"].exists)
    XCTAssertFalse(app.staticTexts["Three sides."].exists)
    XCTAssertFalse(hide.exists)
    XCTAssertEqual(app.state, .runningForeground)
    capture("08-relaunched-fixtures-and-answer-reset")
  }
}
