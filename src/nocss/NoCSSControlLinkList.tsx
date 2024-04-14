import * as React from 'react'
import {themeManager} from "./ThemeManager";
import {useNavigate} from "react-router";
import {ControlLink, noCSSControlLinks} from "./NoCSSPage";
import {Label, VStack} from "../lib/components";
import {stylable} from "../lib/core";


export const NoCSSControlLinkList = stylable(() => {
  const theme = themeManager.theme
  const navigate = useNavigate()

  const linkSelected = (link: ControlLink) => {
    navigate('/controls#' + link)
  }

  return <VStack halign='center' valign='center' gap='0'
                 position='fixed' left='0' top='0'
                 bgColor='#00000020'
                 height='100%' width='200px'>

    {noCSSControlLinks.map(link => {
      return <Label key={link}
                    fontWeight='400'
                    width='100%'
                    className="mono notSelectable"
                    paddingHorizontal='20px'
                    textColor={theme.text50}
                    text={link}
                    textAlign='center'
                    textTransform='capitalize'
                    onClick={() => {
                      linkSelected(link)
                    }}
                    hoverState={state => {
                      state.textColor = theme.orange
                      state.btnCursor = true
                    }}/>
    })}
  </VStack>
})
