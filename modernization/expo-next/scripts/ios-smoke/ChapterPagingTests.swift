import XCTest

/// Run with the established standalone external runner, never the app native project.
/// Port 8085 avoids an owner's development server. See the 04B migration guide.
final class SmokeTests: XCTestCase {
  let app = XCUIApplication(bundleIdentifier: "com.dvale1994.kyrshasapp")
  override func setUpWithError() throws { continueAfterFailure = false }
  private var position: XCUIElement { app.descendants(matching: .any).matching(identifier: "chapter-progress").firstMatch }
  private var next: XCUIElement { app.buttons["next-chapter"] }
  private var previous: XCUIElement { app.buttons["previous-chapter"] }
  private func capture(_ name: String) {
    let shot = XCTAttachment(screenshot: XCUIScreen.main.screenshot())
    shot.name = name; shot.lifetime = .keepAlways; add(shot)
  }
  private func launch() {
    XCUIDevice.shared.orientation = .portrait
    app.launchArguments = ["-RCT_jsLocation", "localhost:8085"]
    app.launch()
    XCTAssertTrue(position.waitForExistence(timeout: 60), app.debugDescription)
    expect(1)
    // Dismiss only the known Debug LogBox banner; retain warnings in Metro logs.
    let dismiss = app.buttons["Dismiss"]
    if dismiss.exists { dismiss.tap() }
    else {
      // The known Debug LogBox close affordance is not always in XCTest's tree.
      // Fixed compact-iPhone acceptance coordinates; assert no chapter was advanced.
      app.coordinate(withNormalizedOffset: CGVector(dx: 0.915, dy: 0.928)).tap()
    }
    expect(1)
  }
  private func expect(_ chapter: Int) {
    let match = XCTNSPredicateExpectation(predicate: NSPredicate(format: "label CONTAINS %@", "chapter \(chapter) of 5"), object: position)
    XCTAssertEqual(XCTWaiter.wait(for: [match], timeout: 8), .completed, app.debugDescription)
  }
  private func reading(_ id: String) -> XCUIElement { app.descendants(matching: .any).matching(identifier: "reading-\(id)").firstMatch }
  private func scrollTo(_ element: XCUIElement, id: String, chapter: Int, limit: Int = 45) {
    for _ in 0..<limit {
      if element.isHittable { return }
      let region = reading(id)
      if element.exists && element.frame.maxY < region.frame.minY { region.swipeDown() }
      else { region.swipeUp() }
      expect(chapter)
    }
    XCTAssertTrue(element.isHittable, app.debugDescription)
  }

  /// Run first against the unchanged default App entry, before external fixture injection.
  func testDefaultMock() {
    launch()
    XCTAssertTrue(app.staticTexts["“Small steps can open new paths.”"].waitForExistence(timeout: 10))
    XCTAssertTrue(app.staticTexts["Offline demo · synthetic content"].exists)
    XCTAssertFalse(previous.isEnabled)
    next.tap(); expect(2)
    let show = app.buttons["Show Answer"]
    scrollTo(show, id: "trivia", chapter: 2)
    show.tap()
    next.tap(); expect(3)
    previous.tap(); expect(2)
    XCTAssertTrue(app.buttons["Hide Answer"].exists)
    capture("default-mock-trivia-revisit")
    XCTAssertGreaterThanOrEqual(next.frame.height, 48)
    XCTAssertGreaterThanOrEqual(previous.frame.height, 48)
  }

  /// Use only with the isolated ConceptFixture entry and default text size.
  func testConceptChapters() {
    launch()
    XCTAssertTrue(app.staticTexts["“The best adventures often begin with curiosity.”"].exists)
    capture("01-quote")
    app.buttons["Refresh quote"].tap()
    XCTAssertTrue(app.staticTexts["Refreshing quote…"].exists)
    capture("06-refresh")
    next.tap(); expect(2)
    capture("02-trivia")
    app.buttons["Show Answer"].tap()
    XCTAssertTrue(app.staticTexts["Mars"].exists)
    capture("07-answer")
    next.tap(); expect(3)
    let fact = app.staticTexts["Octopuses have three hearts, nine brains, and blue blood."]
    if app.staticTexts["Loading fact…"].exists { capture("08-loading") }
    XCTAssertTrue(fact.waitForExistence(timeout: 25))
    capture("03-fact")
    next.tap(); expect(4)
    capture("04-dad-joke")
    app.buttons["Refresh dad joke"].tap()
    XCTAssertTrue(app.buttons["Retry dad joke"].waitForExistence(timeout: 5))
    capture("09-error")
    app.buttons["Retry dad joke"].tap()
    next.tap(); expect(5)
    capture("05-bucket-list")
    XCTAssertFalse(next.isEnabled)
    previous.tap(); expect(4)
    previous.tap(); expect(3)
    app.buttons["Refresh fact"].tap()
    reading("fact").swipeUp(); expect(3)
    capture("10-long-reading")
    XCTAssertTrue(next.isHittable)
  }

  /// Default type only; synthetic no-image short chapters permit swipe navigation.
  func testShortChapterTraversal() {
    launch()
    XCTAssertTrue(app.staticTexts["Short synthetic quote."].waitForExistence(timeout: 10))
    capture("short-01-quote-safe-area")
    reading("quote").swipeDown(); expect(1)
    reading("quote").swipeUp(velocity: .fast); expect(2)
    Thread.sleep(forTimeInterval: 0.4); expect(2)
    let region = reading("trivia")
    let origin = region.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.5))
    let near = region.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.49))
    origin.press(forDuration: 0.1, thenDragTo: near)
    Thread.sleep(forTimeInterval: 0.4); expect(2)
    region.swipeUp(); expect(3)
    capture("short-02-fact-reading-mode")
    next.tap(); expect(4)
    reading("dad joke").swipeUp(velocity: .fast); expect(5)
    reading("bucket list item").swipeUp(); expect(5)
    XCTAssertFalse(next.isEnabled)
    capture("short-03-final-boundary")
    reading("bucket list item").swipeDown(); expect(4)
    previous.tap(); expect(3)
    previous.tap(); expect(2)
    previous.tap(); expect(1)
    XCTAssertFalse(previous.isEnabled)
    capture("short-04-returned-first-boundary")
  }

  /// Supplemental largest-type layout check for every canonical chapter label.
  func testLargestChapterChrome() {
    launch()
    for index in 1...5 {
      expect(index)
      let id = ["quote", "trivia", "fact", "dad joke", "bucket list item"][index - 1]
      XCTAssertGreaterThan(reading(id).frame.height, 48)
      XCTAssertTrue(next.isHittable)
      XCTAssertTrue(previous.isHittable)
      XCTAssertLessThanOrEqual(next.frame.maxY, app.windows.firstMatch.frame.maxY)
      XCTAssertGreaterThanOrEqual(next.frame.height, 48)
      capture("largest-chrome-\(index)")
      if index < 5 { next.tap() }
    }
    XCTAssertFalse(next.isEnabled)
    previous.tap(); expect(4)
  }

  /// Run at default and accessibility-extra-extra-extra-large Dynamic Type.
  func testOverflowAndTrivia() {
    launch()
    next.tap(); expect(2)
    let show = app.buttons["Show Answer"]
    scrollTo(show, id: "trivia", chapter: 2)
    show.tap()
    let hide = app.buttons["Hide Answer"]
    scrollTo(hide, id: "trivia", chapter: 2)
    XCTAssertTrue(app.staticTexts.matching(NSPredicate(format: "label CONTAINS %@", "END OF SYNTHETIC ANSWER")).firstMatch.exists)
    capture("overflow-01-complete-answer-and-hide")
    reading("trivia").swipeUp(); expect(2) // A reading-edge swipe must not page.
    let answerOffsetFrame = hide.frame // Capture the final offset immediately before leaving.
    next.tap(); expect(3)
    previous.tap(); expect(2)
    XCTAssertTrue(hide.isHittable)
    XCTAssertEqual(hide.frame.minY, answerOffsetFrame.minY, accuracy: 8)
    capture("overflow-02-answer-read-position-revisit")
    let refresh = app.buttons["Refresh trivia"]
    scrollTo(refresh, id: "trivia", chapter: 2)
    refresh.tap()
    XCTAssertTrue(app.buttons["Retry trivia"].waitForExistence(timeout: 10))
    XCTAssertTrue(hide.exists)
    capture("overflow-03-failed-refresh-answer-retained")
    app.buttons["Retry trivia"].tap()
    XCTAssertTrue(show.waitForExistence(timeout: 10))
    XCTAssertFalse(hide.exists)
    expect(2)
    capture("overflow-04-identical-success-answer-reset")
    next.tap(); expect(3)
    let region = reading("fact")
    let body = app.staticTexts.matching(NSPredicate(format: "label CONTAINS %@", "END OF SYNTHETIC BODY")).firstMatch
    XCTAssertTrue(body.exists)
    let before = body.frame.minY
    region.swipeUp(); expect(3)
    XCTAssertLessThan(body.frame.minY, before, "Reading gesture should move the long text")
    let author = app.staticTexts.matching(NSPredicate(format: "label CONTAINS %@", "END OF AUTHOR")).firstMatch
    scrollTo(author, id: "fact", chapter: 3)
    XCTAssertTrue(author.isHittable)
    XCTAssertTrue(body.label.contains("café, 三, 🌌"))
    capture("overflow-05-complete-body-attribution")
    region.swipeUp(); expect(3)
    region.swipeUp(velocity: .fast); expect(3)
    XCTAssertTrue(next.isHittable)
    XCTAssertTrue(previous.isHittable)
    XCTAssertGreaterThan(reading("fact").frame.height, 48)
    XCTAssertGreaterThanOrEqual(next.frame.height, 48)
    next.tap(); expect(4)
    capture("overflow-06-explicit-navigation-exits-reading")
    XCTAssertEqual(app.state, .runningForeground)
    XCTAssertLessThan(app.windows.firstMatch.frame.width, app.windows.firstMatch.frame.height)
  }
}
