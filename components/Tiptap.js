'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

const Tiptap = () => {
    const editor =useEditor({
        extensions:[
            StarterKit,
        ],
        content:'<p>Hello World! 🌎️</p> <p>Welcome to tip tap editor</p><p>Hi Everyone.</p>',
    })
  return (
    <div>
      <EditorContent editor={editor}/>
    </div>
  )
}

export default Tiptap
