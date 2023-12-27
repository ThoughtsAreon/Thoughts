import React from 'react'
import { createReactEditorJS } from 'react-editor-js'
import { API, OutputData } from '@editorjs/editorjs'

// @ts-ignore
import Paragraph from '@editorjs/paragraph'
// @ts-ignore
import Embed from '@editorjs/embed'
// @ts-ignore
import List from '@editorjs/list'
// @ts-ignore
import Code from '@editorjs/code'
// @ts-ignore
import Image from '@editorjs/image'
// @ts-ignore
import Header from '@editorjs/header'
// @ts-ignore
import edjsParser from 'editorjs-parser'
// @ts-ignore
import LinkTool from '@editorjs/link'
import { atom, useRecoilState } from 'recoil'

interface EditorCore {
  destroy(): Promise<void>

  clear(): Promise<void>

  save(): Promise<OutputData>

  render(data: OutputData): Promise<void>
}

const blocks = {
  time: 1635603431943,
  blocks: [
    {
      id: "sheNwCUP5A",
      type: "paragraph",
      data: {
        text: "Let's Start Writing!"
      }
    }
  ]
}

const editorState = atom<OutputData>({
  key: 'editorState',
  default: blocks,
});

type EditorToolsProps = {
  onChange: (data: OutputData) => void
}

function EditorTools({ onChange }: EditorToolsProps) {
  // const [blogData, setBlogData] = React.useState<string>("")
  const [editorData, setEditorData] = useRecoilState<OutputData>(editorState)

  const ReactEditorJS = createReactEditorJS()
  const editorCore = React.useRef(null)

  const handleInitialize = React.useCallback((instance: any) => {
    editorCore.current = instance
  }, [])

  const handleChange = async(data: API) => {
    const outputData = await data.saver.save()
    setEditorData(outputData)
    onChange(outputData)
  }

  return (
    <div className='w-screen mx-auto'>
      <ReactEditorJS 
        defaultValue={editorData} 
        tools={{ 
          paragraph: Paragraph,
          embed: Embed,
          list: List,
          code: Code,
          image: Image,
          header: {
            class: Header,
            config: {
              levels: [1, 2, 3],
              defaultLevel: 1
            }
          },
          linkTool: LinkTool,
        }}
        value={blocks}
        onChange={(data) => handleChange(data)}
        onInitialize={handleInitialize}
      />
    </div>
  )
}

export default EditorTools

