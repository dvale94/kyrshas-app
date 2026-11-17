import XCTest

/// Attach to the already-running synthetic app. After READY_FOR_METRO_EDIT appears
/// in the test log, edit only the JS caption and refresh Metro; never build,
/// install, relaunch or activate the app during this acceptance interval.
final class MetroProbeTests: XCTestCase {
  func testEditedCaptionArrivesThroughMetro() throws {
    continueAfterFailure = false
    let app = XCUIApplication(bundleIdentifier: "com.dvale1994.kyrshasapp")
    XCTAssertEqual(app.state, .runningForeground, "Launch the baseline app before this test")
    let baseline = app.staticTexts.matching(identifier: "Offline demo · synthetic content").firstMatch
    XCTAssertTrue(baseline.waitForExistence(timeout: 15), "The running app must first render the baseline")
    let before = XCTAttachment(screenshot: XCUIScreen.main.screenshot())
    before.name = "metro-baseline-before-edit"
    before.lifetime = .keepAlways
    add(before)
    print("READY_FOR_METRO_EDIT: waiting for a source-only caption edit and Metro refresh")
    let marker = app.staticTexts.matching(identifier: "Offline demo · Metro probe 03A").firstMatch
    let visible = marker.waitForExistence(timeout: 90)
    let screenshot = XCTAttachment(screenshot: XCUIScreen.main.screenshot())
    screenshot.name = "actual-metro-probe-result"
    screenshot.lifetime = .keepAlways
    add(screenshot)
    XCTAssertTrue(visible, "Metro must deliver the edited caption without native rebuild, reinstall or relaunch")
    XCTAssertEqual(app.state, .runningForeground)
  }
}
