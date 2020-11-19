/* eslint-disable indent */
import React from 'react'
import { Bubble } from 'react-native-gesture-handler'

export default function renderChatBubbles(theme){
    let renderBubble
    switch (theme) {
        case 'sassy':
            renderBubble = SASSY
            break
    
        default:
            break
    }

    return renderBubble
}

export const SASSY = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: '#ecff70',
          },
          left: {
            color: 'white',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#dfa7ff',
          },
          right: {
            backgroundColor: '#ff36b8',
          },
        }}
        usernameStyle= {{
          color: '#faffaf'
        }}
      />
    )
  }