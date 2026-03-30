<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
export default {
    name:"Editor",
    components: {
    EditorContent,
  },
    data() {
        return{
            editor: null,
        }
    },
    emits: ['update:modelValue'],
    props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
    watch:{
    modelValue(value) {
      const isSame = this.editor.getHTML() === value
      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },
  mounted(){
    this.editor = new Editor({
      
      extensions: [
        StarterKit,Document,Paragraph,Text,Bold,
        Paragraph.configure({
         HTMLAttributes: {
        class: 'my-custom-paragraph',
         },
        }),
        
      ],
     
      detailOfExperience: this.modelValue,
      autofocus: true,
      editable: true,
     injectCSS: false,
      onUpdate: () => {
        // HTML
        this.$emit('update:modelValue', this.editor.getHTML())

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    })
 }
}
</script>
<template>
    <div v-if="editor">
        <button @click.prevent="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
          bold
        </button>
        <button @click.prevent="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
          italic
        </button>
        <button @click.prevent="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
          strike
        </button>
        <button @click.prevent="editor.chain().focus().toggleCode().run()" :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
          code
        </button>
        <button @click.prevent="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
          bullet list
        </button>
        <button @click.prevent="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
          ordered list
        </button>
        <button @click.prevent="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
          code block
        </button>
        <button @click.prevent="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
          blockquote
        </button>
        <button @click.prevent="editor.chain().focus().setHorizontalRule().run()">
          horizontal rule
        </button>
        <!-- <button @click.prevent="editor.chain().focus().setHardBreak().run()">
          hard break
        </button> -->
        <button @click.prevent="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
          undo
        </button>
        <button @click.prevent="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
          redo
        </button>
      </div>
      <hr>
    <editor-content :editor="editor" />


</template>
<style scoped>
hr{ 
    margin:0 !important;
}

</style>