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
      let scroll = app.scrollViews.firstMatch
      // Collapsing a large answer can leave the next target above the viewport.
      let towardEnd = element.exists && !element.frame.isEmpty
        ? element.frame.midY > scroll.frame.midY : up
      if towardEnd { scroll.swipeUp() }
      else { scroll.swipeDown() }
    }
    XCTAssertTrue(element.isHittable, "Expected visible element: \(element)\n\(app.debugDescription)")
  }

  /// Run separately with -only-testing and the documented external mock injection.
  /// Normal application source contains no failure-mode launch switch.
  func testControlledMockFailureRecovery() throws {
    let app = XCUIApplication(bundleIdentifier: "com.dvale1994.kyrshasapp")
    app.launchArguments = ["-RCT_jsLocation", "localhost:8081"]
    XCUIDevice.shared.orientation = .portrait
    app.launch()
    let initialStatus = app.staticTexts["Loading quote…"]
    XCTAssertTrue(initialStatus.waitForExistence(timeout: 60), app.debugDescription)
    XCTAssertFalse(app.buttons["Refresh quote"].isEnabled)
    capture("failure-01-initial-loading")
    let quoteError = app.staticTexts["Could not load this example. Use Retry quote to try again."]
    XCTAssertTrue(quoteError.waitForExistence(timeout: 10), app.debugDescription)
    let question = app.staticTexts["How many sides does a triangle have?"]
    XCTAssertTrue(question.waitForExistence(timeout: 10))
    XCTAssertTrue(app.buttons["Retry quote"].isEnabled)
    capture("failure-02-isolated-initial-error")
    app.buttons["Retry quote"].tap()
    XCTAssertTrue(initialStatus.waitForExistence(timeout: 2))
    XCTAssertTrue(app.staticTexts["“Small steps can open new paths.”"].waitForExistence(timeout: 10))
    XCTAssertFalse(quoteError.exists)
    capture("failure-03-recovered-quote")

    let show = app.buttons["Show Answer"]
    scrollTo(show, in: app)
    show.tap()
    XCTAssertTrue(app.staticTexts["Three sides."].waitForExistence(timeout: 5))
    app.buttons["Refresh trivia"].tap()
    XCTAssertTrue(app.staticTexts["Refreshing trivia…"].waitForExistence(timeout: 2))
    XCTAssertTrue(app.staticTexts["Three sides."].exists)
    let triviaError = app.staticTexts["Could not refresh this example. Use Retry trivia to try again."]
    XCTAssertTrue(triviaError.waitForExistence(timeout: 10))
    XCTAssertTrue(question.exists)
    XCTAssertTrue(app.staticTexts["Three sides."].exists)
    capture("failure-04-last-good-answer-retained")
    let retry = app.buttons["Retry trivia"]
    scrollTo(retry, in: app)
    retry.tap()
    XCTAssertTrue(app.staticTexts["How many corners does a square have?"].waitForExistence(timeout: 10))
    XCTAssertFalse(triviaError.exists)
    XCTAssertFalse(app.staticTexts["Three sides."].exists)
    XCTAssertFalse(app.staticTexts["Four corners."].exists)
    scrollTo(show, in: app)
    show.tap()
    XCTAssertTrue(app.staticTexts["Four corners."].waitForExistence(timeout: 5))
    capture("failure-05-retry-new-trivia")
  }

  /// Run only against the external entry using a copied contentEdges.native.ts fixture.
  /// Metro excludes __tests__; see the migration guide for the external-only copy.
  /// Also runnable after simctl ui <disposable-id> content_size accessibility-medium.
  func testSyntheticContentEdges() throws {
    let app = XCUIApplication(bundleIdentifier: "com.dvale1994.kyrshasapp")
    app.launchArguments = ["-RCT_jsLocation", "localhost:8081"]
    XCUIDevice.shared.orientation = .portrait
    app.launch()
    let story = app.staticTexts.matching(NSPredicate(format: "label CONTAINS %@", "End of the synthetic story.")).firstMatch
    XCTAssertTrue(story.waitForExistence(timeout: 60), app.debugDescription)
    XCTAssertTrue(story.label.contains("Café paths, naïve robots"))
    let width = app.windows.firstMatch.frame.width
    XCTAssertLessThanOrEqual(story.frame.width, width - 20)
    XCTAssertGreaterThanOrEqual(story.frame.minX, 10)
    capture("edge-01-long-quote-image-top")
    let author = app.staticTexts.matching(NSPredicate(format: "label BEGINSWITH %@", "- Fictional Cartographer")).firstMatch
    scrollTo(author, in: app)
    XCTAssertTrue(author.label.hasSuffix("Entirely Synthetic Adventures"))
    XCTAssertLessThanOrEqual(author.frame.width, width - 20)
    XCTAssertGreaterThanOrEqual(author.frame.minX, 10)
    capture("edge-02-complete-attribution")

    let heading = app.staticTexts.matching(NSPredicate(format: "label BEGINSWITH %@", "TRIVIA FROM THE IMAGINARY PAPER CITY")).firstMatch
    scrollTo(heading, in: app)
    XCTAssertTrue(heading.label.hasSuffix("DELIBERATELY LONG HEADING"))
    XCTAssertGreaterThan(heading.frame.height, 30, "Long heading must wrap")
    XCTAssertLessThanOrEqual(heading.frame.maxX, width - 10)
    capture("edge-03-long-heading-and-prompt")
    let show = app.buttons["Show Answer"]
    scrollTo(show, in: app)
    XCTAssertGreaterThanOrEqual(show.frame.height, 48)
    show.tap()
    let answer = app.staticTexts.matching(NSPredicate(format: "label CONTAINS %@", "End of the synthetic answer.")).firstMatch
    XCTAssertTrue(answer.waitForExistence(timeout: 5))
    XCTAssertLessThanOrEqual(answer.frame.width, width - 20)
    let hide = app.buttons["Hide Answer"]
    scrollTo(hide, in: app)
    capture("edge-04-long-answer-end-and-control")
    hide.tap()
    XCTAssertFalse(answer.exists)
    let fact = app.staticTexts.matching(NSPredicate(format: "label BEGINSWITH %@", "One.")).firstMatch
    scrollTo(fact, in: app)
    XCTAssertTrue(fact.label.contains("三 ✨"))
    capture("edge-05-no-image-short-multiline-fact")
    let joke = app.staticTexts.matching(NSPredicate(format: "label BEGINSWITH %@", "Why did the fictional map smile?")).firstMatch
    scrollTo(joke, in: app)
    XCTAssertTrue(joke.label.contains("voilà!"))
    let bucket = app.staticTexts.matching(NSPredicate(format: "label BEGINSWITH %@", "Fold a tiny paper boat.")).firstMatch
    scrollTo(bucket, in: app)
    XCTAssertTrue(bucket.label.hasSuffix("imaginary passenger."))
    capture("edge-06-image-bucket-and-final-card")
    XCTAssertEqual(app.state, .runningForeground)
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
