//
//  Colors.swift
//  SpicetifyPseudonative
//
//  Created by vanyauhalin on 26.04.2022.
//

import SwiftUI
import AppKit

struct Colors {
    let name: String
    let value: Color
    static var list: [Colors] { [
        Colors(name: "black", value: .black),
        Colors(name: "blue", value: .blue),
        Colors(name: "brown", value: .brown),
        Colors(name: "cyan", value: .cyan),
        Colors(name: "darkGray", value: .darkGray),
        Colors(name: "gray", value: .gray),
        Colors(name: "green", value: .green),
        Colors(name: "lightGray", value: .lightGray),
        Colors(name: "magenta", value: .magenta),
        Colors(name: "orange", value: .orange),
        Colors(name: "purple", value: .purple),
        Colors(name: "red", value: .red),
        Colors(name: "white", value: .white),
        Colors(name: "yellow", value: .yellow),
        Colors(name: "alternateSelectedControlTextColor", value: .alternateSelectedControlTextColor),
        Colors(name: "clear", value: .clear),
        Colors(name: "controlAccentColor", value: .controlAccentColor),
        Colors(name: "controlBackgroundColor", value: .controlBackgroundColor),
        Colors(name: "controlColor", value: .controlColor),
        Colors(name: "controlTextColor", value: .controlTextColor),
        Colors(name: "disabledControlTextColor", value: .disabledControlTextColor),
        Colors(name: "findHighlightColor", value: .findHighlightColor),
        Colors(name: "gridColor", value: .gridColor),
        Colors(name: "headerTextColor", value: .headerTextColor),
        Colors(name: "highlightColor", value: .highlightColor),
        Colors(name: "keyboardFocusIndicatorColor", value: .keyboardFocusIndicatorColor),
        Colors(name: "labelColor", value: .labelColor),
        Colors(name: "linkColor", value: .linkColor),
        Colors(name: "placeholderTextColor", value: .placeholderTextColor),
        Colors(name: "quaternaryLabelColor", value: .quaternaryLabelColor),
        Colors(name: "secondaryLabelColor", value: .secondaryLabelColor),
        Colors(name: "selectedContentBackgroundColor", value: .selectedContentBackgroundColor),
        Colors(name: "selectedControlColor", value: .selectedControlColor),
        Colors(name: "selectedControlTextColor", value: .selectedControlTextColor),
        Colors(name: "selectedMenuItemTextColor", value: .selectedMenuItemTextColor),
        Colors(name: "selectedTextBackgroundColor", value: .selectedTextBackgroundColor),
        Colors(name: "selectedTextColor", value: .selectedTextColor),
        Colors(name: "separatorColor", value: .separatorColor),
        Colors(name: "shadowColor", value: .shadowColor),
        Colors(name: "systemBlue", value: .systemBlue),
        Colors(name: "systemBrown", value: .systemBrown),
        Colors(name: "systemCyan", value: .systemCyan),
        Colors(name: "systemGray", value: .systemGray),
        Colors(name: "systemGreen", value: .systemGreen),
        Colors(name: "systemIndigo", value: .systemIndigo),
        Colors(name: "systemMint", value: .systemMint),
        Colors(name: "systemOrange", value: .systemOrange),
        Colors(name: "systemPink", value: .systemPink),
        Colors(name: "systemPurple", value: .systemPurple),
        Colors(name: "systemRed", value: .systemRed),
        Colors(name: "systemTeal", value: .systemTeal),
        Colors(name: "systemYellow", value: .systemYellow),
        Colors(name: "tertiaryLabelColor", value: .tertiaryLabelColor),
        Colors(name: "textBackgroundColor", value: .textBackgroundColor),
        Colors(name: "textColor", value: .textColor),
        Colors(name: "underPageBackgroundColor", value: .underPageBackgroundColor),
        Colors(name: "unemphasizedSelectedContentBackgroundColor", value: .unemphasizedSelectedContentBackgroundColor),
        Colors(name: "unemphasizedSelectedTextBackgroundColor", value: .unemphasizedSelectedTextBackgroundColor),
        Colors(name: "unemphasizedSelectedTextColor", value: .unemphasizedSelectedTextColor),
        Colors(name: "windowBackgroundColor", value: .windowBackgroundColor),
        Colors(name: "windowFrameTextColor", value: .windowFrameTextColor)]
    }
}

extension Color {
    static let black = Color(AppKit.NSColor.black)
    static let blue = Color(AppKit.NSColor.blue)
    static let brown = Color(AppKit.NSColor.brown)
    static let cyan = Color(AppKit.NSColor.cyan)
    static let darkGray = Color(AppKit.NSColor.darkGray)
    static let gray = Color(AppKit.NSColor.gray)
    static let green = Color(AppKit.NSColor.green)
    static let lightGray = Color(AppKit.NSColor.lightGray)
    static let magenta = Color(AppKit.NSColor.magenta)
    static let orange = Color(AppKit.NSColor.orange)
    static let purple = Color(AppKit.NSColor.purple)
    static let red = Color(AppKit.NSColor.red)
    static let white = Color(AppKit.NSColor.white)
    static let yellow = Color(AppKit.NSColor.yellow)
    static let alternateSelectedControlTextColor = Color(AppKit.NSColor.alternateSelectedControlTextColor)
    static let clear = Color(AppKit.NSColor.clear)
    static let controlAccentColor = Color(AppKit.NSColor.controlAccentColor)
    static let controlBackgroundColor = Color(AppKit.NSColor.controlBackgroundColor)
    static let controlColor = Color(AppKit.NSColor.controlColor)
    static let controlTextColor = Color(AppKit.NSColor.controlTextColor)
//    No exact matches in call to initializer.
//    static let currentControlTint = Color(AppKit.NSColor.currentControlTint)
    static let disabledControlTextColor = Color(AppKit.NSColor.disabledControlTextColor)
    static let findHighlightColor = Color(AppKit.NSColor.findHighlightColor)
    static let gridColor = Color(AppKit.NSColor.gridColor)
    static let headerTextColor = Color(AppKit.NSColor.headerTextColor)
    static let highlightColor = Color(AppKit.NSColor.highlightColor)
    static let keyboardFocusIndicatorColor = Color(AppKit.NSColor.keyboardFocusIndicatorColor)
    static let labelColor = Color(AppKit.NSColor.labelColor)
    static let linkColor = Color(AppKit.NSColor.linkColor)
    static let placeholderTextColor = Color(AppKit.NSColor.placeholderTextColor)
    static let quaternaryLabelColor = Color(AppKit.NSColor.quaternaryLabelColor)
//    App crashes with this color.
//    static let scrubberTexturedBackground = Color(AppKit.NSColor.scrubberTexturedBackground)
    static let secondaryLabelColor = Color(AppKit.NSColor.secondaryLabelColor)
    static let selectedContentBackgroundColor = Color(AppKit.NSColor.selectedContentBackgroundColor)
    static let selectedControlColor = Color(AppKit.NSColor.selectedControlColor)
    static let selectedControlTextColor = Color(AppKit.NSColor.selectedControlTextColor)
    static let selectedMenuItemTextColor = Color(AppKit.NSColor.selectedMenuItemTextColor)
    static let selectedTextBackgroundColor = Color(AppKit.NSColor.selectedTextBackgroundColor)
    static let selectedTextColor = Color(AppKit.NSColor.selectedTextColor)
    static let separatorColor = Color(AppKit.NSColor.separatorColor)
    static let shadowColor = Color(AppKit.NSColor.shadowColor)
    static let systemBlue = Color(AppKit.NSColor.systemBlue)
    static let systemBrown = Color(AppKit.NSColor.systemBrown)
    static let systemCyan = Color(AppKit.NSColor.systemCyan)
    static let systemGray = Color(AppKit.NSColor.systemGray)
    static let systemGreen = Color(AppKit.NSColor.systemGreen)
    static let systemIndigo = Color(AppKit.NSColor.systemIndigo)
    static let systemMint = Color(AppKit.NSColor.systemMint)
    static let systemOrange = Color(AppKit.NSColor.systemOrange)
    static let systemPink = Color(AppKit.NSColor.systemPink)
    static let systemPurple = Color(AppKit.NSColor.systemPurple)
    static let systemRed = Color(AppKit.NSColor.systemRed)
    static let systemTeal = Color(AppKit.NSColor.systemTeal)
    static let systemYellow = Color(AppKit.NSColor.systemYellow)
    static let tertiaryLabelColor = Color(AppKit.NSColor.tertiaryLabelColor)
    static let textBackgroundColor = Color(AppKit.NSColor.textBackgroundColor)
    static let textColor = Color(AppKit.NSColor.textColor)
    static let underPageBackgroundColor = Color(AppKit.NSColor.underPageBackgroundColor)
    static let unemphasizedSelectedContentBackgroundColor = Color(AppKit.NSColor.unemphasizedSelectedContentBackgroundColor)
    static let unemphasizedSelectedTextBackgroundColor = Color(AppKit.NSColor.unemphasizedSelectedTextBackgroundColor)
    static let unemphasizedSelectedTextColor = Color(AppKit.NSColor.unemphasizedSelectedTextColor)
    static let windowBackgroundColor = Color(AppKit.NSColor.windowBackgroundColor)
    static let windowFrameTextColor = Color(AppKit.NSColor.windowFrameTextColor)
}
