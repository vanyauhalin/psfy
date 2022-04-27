//
//  ContentView.swift
//  SpicetifyPseudonative
//
//  Created by vanyauhalin on 26.04.2022.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        ScrollView {
            VStack(
                alignment: .leading
            ) {
                HStack {
                    Text("Light")
                        .frame(width: 75, height: 40, alignment: .center)
                    Text("Dark")
                        .frame(width: 75, height: 40, alignment: .center)
                }
                List(Colors.list, id: \.name) { color in
                    HStack {
                        Rectangle()
                            .environment(\.colorScheme, .light)
                            .frame(width: 75, height: 40)
                            .foregroundColor(color.value)
                        Rectangle()
                            .environment(\.colorScheme, .dark)
                            .frame(width: 75, height: 40)
                            .foregroundColor(color.value)
                        Text(color.name)
                            .frame(width: 200, alignment: .leading)
                    }
                }
                .frame(width: 400, height: 400)
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
