import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { colorInput } from '@sanity/color-input'
import { schema } from './sanity/schemaTypes'
import { projectId, dataset } from './sanity/env'
import React from 'react'

const CustomLogo = () => React.createElement('img', {
  src: '/images/logo/logo_radeva.jpg',
  alt: 'Radeva Logo',
  style: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }
})

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Radeva Organizer',
  icon: CustomLogo,

  schema,
  plugins: [structureTool(), colorInput()],
})
