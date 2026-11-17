import XCTest

/// Explicit live-Metro acceptance probe, separate from the passing embedded smoke.
/// Temporarily edit the caption as documented before running this test.
final class MetroProbeTests: XCTestCase {
  func testEditedCaptionArrivesThroughMetro() throws {
    continueAfterFailure = false
    let app = XCUIApplication(bundleIdentifier: "com.dvale1994.kyrshasapp")
    app.launchArguments = ["-RCT_jsLocation", "localhost:8081"]
    app.launch()
    let marker = app.staticTexts.matching(identifier: "Offline demo · Metro probe 03A").firstMatch
    let visible = marker.waitForExistence(timeout: 15)
    let screenshot = XCTAttachment(screenshot: XCUIScreen.main.screenshot())
    screenshot.name = "actual-metro-probe-result"
    screenshot.lifetime = .keepAlways
    add(screenshot)
    XCTAssertTrue(visible, "Metro refresh must deliver the edited caption; embedded baseline rendering is not a live-loop PASS")
  }
}
