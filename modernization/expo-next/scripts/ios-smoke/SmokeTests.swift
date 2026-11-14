import XCTest

/// Runs against the synthetic app already installed on a disposable simulator.
/// The app's existing native project is never changed by this test runner.
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

  func testSyntheticIPhoneSmoke() throws {
    let app = XCUIApplication(bundleIdentifier: "com.dvale1994.kyrshasapp")
    let device = XCUIDevice.shared
    device.orientation = .portrait
    app.launch()

    // RN can expose nested static-text nodes with the same label after rotation.
    // Resolve the first matching node, while still asserting actual visibility/taps.
    let question = app.staticTexts.matching(identifier: "How many sides does a triangle have?").firstMatch
    let answer = app.staticTexts.matching(identifier: "Three sides.").firstMatch
    let show = app.buttons["Show Answer"]
    let hide = app.buttons["Hide Answer"]
    XCTAssertTrue(question.waitForExistence(timeout: 60), app.debugDescription)
    XCTAssertTrue(app.staticTexts["Offline demo · synthetic content"].exists)
    XCTAssertTrue(show.isHittable)
    XCTAssertFalse(answer.exists)
    capture("01-rendered-answer-hidden")

    show.tap()
    XCTAssertTrue(answer.waitForExistence(timeout: 5))
    XCTAssertTrue(hide.isHittable)
    capture("02-answer-shown")
    hide.tap()
    XCTAssertTrue(show.waitForExistence(timeout: 5))
    XCTAssertFalse(answer.exists)
    capture("03-answer-hidden-again")

    device.orientation = .landscapeLeft
    // Device rotation and accessibility snapshots settle asynchronously.
    // Preserve the hittability assertion, with a bounded synchronization wait.
    let rotationSettled = XCTNSPredicateExpectation(
      predicate: NSPredicate { _, _ in question.isHittable }, object: nil)
    XCTAssertEqual(XCTWaiter.wait(for: [rotationSettled], timeout: 10), .completed,
      "Question must remain hittable after rotation; window=\(app.windows.element(boundBy: 0).frame), question=\(question.frame)")
    let portraitFrame = app.windows.element(boundBy: 0).frame
    XCTAssertLessThan(portraitFrame.width, portraitFrame.height, "App must remain portrait after a landscape request")
    capture("04-portrait-after-landscape-request")
    device.orientation = .portrait

    app.terminate()
    app.launch()
    XCTAssertTrue(question.waitForExistence(timeout: 30))
    XCTAssertTrue(show.isHittable)
    XCTAssertFalse(answer.exists)
    XCTAssertEqual(app.state, .runningForeground)
    capture("05-relaunched-answer-hidden")

    device.press(.home)
    capture("06-home-screen-icon-observation")
  }
}
