"use client"

import React from 'react'
import Membership from '../shared/membership'
import Homecomponents from '../shared/home-components'
import Oportunity1 from '../shared/oportunity1'
import { Oprtunity2 } from '../shared/oportunity2'
import Oportunity3 from '../shared/oportunity3'
import Oportunity4 from '../shared/oportunity4'
import { AnimatePresence } from 'framer-motion'

const Homepage = () => {
  return (
    <AnimatePresence >
      <Homecomponents/>
      <Oportunity1/>
      <Oprtunity2/>
      <Oportunity3/>
      <Oportunity4/>
      <Membership/>
    </AnimatePresence>
  )
}

export default Homepage