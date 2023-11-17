import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";
import BulletList from "@tiptap/extension-bullet-list";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from '@tiptap/extension-underline'

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      OrderedList,
      ListItem,
      BulletList,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Bold,
      Italic,
      Underline,
    ],
    content: `
   
      <ol>
        <li>A list item</li>
        <li>And another one</li>
      </ol>

      <ol start="5">
        <li>This item starts at 5</li>
        <li>And another one</li>
      </ol>
    `,
  });

  const tiptapstate = editor?.getJSON();
  console.log(tiptapstate);

  if (!editor) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-5xl font-bold mb-4 text-center">Tiptap Editor</h1>
      <h1 className="text-xl font-bold mb-4">Ordered/Unorderd List</h1>
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-4 py-2 bg-black text-white ${
            editor.isActive("bulletList") ? "is-active" : ""
          }`}
        >
          toggleBulletList
        </button>
        <button
          onClick={() => editor.chain().focus().splitListItem("listItem").run()}
          disabled={!editor.can().splitListItem("listItem")}
          className={`px-4 py-2 bg-black text-white ${
            !editor.can().splitListItem("listItem") ? "cursor-not-allowed" : ""
          }`}
        >
          splitListItem
        </button>
        <button
          onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
          disabled={!editor.can().sinkListItem("listItem")}
          className={`px-4 py-2 bg-black text-white ${
            !editor.can().sinkListItem("listItem") ? "cursor-not-allowed" : ""
          }`}
        >
          sinkListItem
        </button>
        <button
          onClick={() => editor.chain().focus().liftListItem("listItem").run()}
          disabled={!editor.can().liftListItem("listItem")}
          className={`px-4 py-2 bg-black text-white ${
            !editor.can().liftListItem("listItem") ? "cursor-not-allowed" : ""
          }`}
        >
          liftListItem
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-4 py-2 bg-black text-white ${
            editor.isActive("orderedList") ? "is-active" : ""
          }`}
        >
          Toggle Ordered List
        </button>
      </div>

      <h1 className="text-xl font-bold mb-4">Text color</h1>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={`px-4 py-2 bg-purple-500 text-white ${
            editor.isActive("textStyle", { color: "#958DF1" })
              ? "is-active"
              : ""
          }`}
          data-testid="setPurple"
        >
          Purple
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#F98181").run()}
          className={`px-4 py-2 bg-red-500 text-white ${
            editor.isActive("textStyle", { color: "#F98181" })
              ? "is-active"
              : ""
          }`}
          data-testid="setRed"
        >
          Red
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#FBBC88").run()}
          className={`px-4 py-2 bg-orange-500 text-white ${
            editor.isActive("textStyle", { color: "#FBBC88" })
              ? "is-active"
              : ""
          }`}
          data-testid="setOrange"
        >
          Orange
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#FAF594").run()}
          className={`px-4 py-2 bg-yellow-500 text-white ${
            editor.isActive("textStyle", { color: "#FAF594" })
              ? "is-active"
              : ""
          }`}
          data-testid="setYellow"
        >
          Yellow
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#70CFF8").run()}
          className={`px-4 py-2 bg-blue-500 text-white ${
            editor.isActive("textStyle", { color: "#70CFF8" })
              ? "is-active"
              : ""
          }`}
          data-testid="setBlue"
        >
          Blue
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#94FADB").run()}
          className={`px-4 py-2 bg-teal-500 text-white ${
            editor.isActive("textStyle", { color: "#94FADB" })
              ? "is-active"
              : ""
          }`}
          data-testid="setTeal"
        >
          Teal
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#B9F18D").run()}
          className={`px-4 py-2 bg-green-500 text-white ${
            editor.isActive("textStyle", { color: "#B9F18D" })
              ? "is-active"
              : ""
          }`}
          data-testid="setGreen"
        >
          Green
        </button>
        <button
          onClick={() => editor.chain().focus().unsetColor().run()}
          className="px-4 py-2 bg-gray-500 text-white"
          data-testid="unsetColor"
        >
          UnsetColor
        </button>
      </div>
      <h1 className="text-xl font-bold mb-4">Highlight Text</h1>
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`px-4 py-2 bg-gray-300 ${
            editor.isActive("highlight") ? "is-active" : ""
          }`}
        >
          Toggle Highlight
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#ffc078" }).run()
          }
          className={`px-4 py-2 bg-orange-500 text-white ${
            editor.isActive("highlight", { color: "#ffc078" })
              ? "is-active"
              : ""
          }`}
        >
          Orange
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#8ce99a" }).run()
          }
          className={`px-4 py-2 bg-green-500 text-white ${
            editor.isActive("highlight", { color: "#8ce99a" })
              ? "is-active"
              : ""
          }`}
        >
          Green
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#74c0fc" }).run()
          }
          className={`px-4 py-2 bg-blue-500 text-white ${
            editor.isActive("highlight", { color: "#74c0fc" })
              ? "is-active"
              : ""
          }`}
        >
          Blue
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#b197fc" }).run()
          }
          className={`px-4 py-2 bg-purple-500 text-white ${
            editor.isActive("highlight", { color: "#b197fc" })
              ? "is-active"
              : ""
          }`}
        >
          Purple
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "red" }).run()
          }
          className={`px-4 py-2 bg-red-500 text-white ${
            editor.isActive("highlight", { color: "red" }) ? "is-active" : ""
          }`}
        >
          Red
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#ffa8a8" }).run()
          }
          className={`px-4 py-2 bg-red-500 text-white ${
            editor.isActive("highlight", { color: "#ffa8a8" })
              ? "is-active"
              : ""
          }`}
        >
          Red (#ffa8a8)
        </button>
        <button
          onClick={() => editor.chain().focus().unsetHighlight().run()}
          className={`px-4 py-2 bg-gray-500 text-white ${
            !editor.isActive("highlight") ? "cursor-not-allowed" : ""
          }`}
          disabled={!editor.isActive("highlight")}
        >
          Unset Highlight
        </button>
      </div>
      <h1 className="text-xl font-bold mb-4">Text Formating</h1>
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-4 py-2 text-${
            editor.isActive("bold") ? "white" : "black"
          } ${
            editor.isActive("bold")
              ? "bg-black"
              : "bg-white border-black border-2"
          } rounded`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-4 py-2 text-${
            editor.isActive("italic") ? "white" : "black"
          } ${
            editor.isActive("italic")
              ? "bg-black"
              : "bg-white border-black border-2"
          } rounded`}
        >
          Italic
        </button>
        <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`px-4 py-2 text-${
          editor.isActive("underline") ? "white" : "black"
        } ${
          editor.isActive("underline")
            ? "bg-black"
            : "bg-white border-black border-2"
        } rounded`}
      >
        Underline
      </button>
      </div>

      <EditorContent editor={editor} className="border p-4" />
    </div>
  );
};

export default TiptapEditor;
