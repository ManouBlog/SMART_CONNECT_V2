<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
// import Document from "@tiptap/extension-document";
// import Paragraph from "@tiptap/extension-paragraph";
// import Text from "@tiptap/extension-text";
// import Bold from "@tiptap/extension-bold";
export default {
  name: "EditorVue",
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: null,
    };
  },
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  watch: {
    modelValue(value) {
      const isSame = this.editor.getHTML() === value;
      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.modelValue,
      extensions: [
        StarterKit,
        // Document,
        // Paragraph,
        // Text,
        // Bold,
        // Paragraph.configure({
        //   HTMLAttributes: {
        //     class: "my-custom-paragraph",
        //   },
        // }),
      ],

      detailOfExperience: this.modelValue,
      autofocus: true,
      editable: true,
      injectCSS: false,
      onUpdate: () => {
        // HTML
        this.$emit("update:modelValue", this.editor.getHTML());

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    });
  },
};
</script>
<template>
  <div v-if="editor" class="conteneur">
    <button
      @click.prevent="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
    >
      <em class="bi bi-type-bold"></em>
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
    >
      <em class="bi bi-type-italic"></em>
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleStrike().run()"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
    >
      <em class="bi bi-type-strikethrough"></em>
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleCode().run()"
      :disabled="!editor.can().chain().focus().toggleCode().run()"
      :class="{ 'is-active': editor.isActive('code') }"
    >
      <em class="bi bi-code"></em>
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }"
    >
      <em class="bi bi-list-task"></em>
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleOrderedList().run()"
      :class="{ 'is-active': editor.isActive('orderedList') }"
    >
      <em class="bi bi-list-task"></em>
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleCodeBlock().run()"
      :class="{ 'is-active': editor.isActive('codeBlock') }"
    >
      <em class="bi bi-code-square"></em>
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleBlockquote().run()"
      :class="{ 'is-active': editor.isActive('Blockquote') }"
    >
      <em class="bi bi-quote"></em>
    </button>
    <button
      @click.prevent="editor.chain().focus().setHorizontalRule().run()"
      :class="{ 'is-active': editor.isActive('HorizontalRule') }"
    >
      <em class="bi bi-dash-lg"></em>
    </button>
    <button
      @click.prevent="editor.chain().focus().setHardBreak().run()"
      :class="{ 'is-active': editor.isActive('HardBreak') }"
    >
      <em class="bi bi-paragraph"></em>
    </button>
    <button
      @click.prevent="editor.chain().focus().undo().run()"
      :disabled="!editor.can().chain().focus().undo().run()"
      :class="{ 'is-active': editor.isActive('undo') }"
    >
      <em class="bi bi-arrow-counterclockwise"></em>
    </button>
    <button
      @click.prevent="editor.chain().focus().redo().run()"
      :disabled="!editor.can().chain().focus().redo().run()"
      :class="{ 'is-active': editor.isActive('redo') }"
    >
      <em class="bi bi-arrow-counterclockwise"></em>
    </button>
  </div>
  <hr />
  <editor-content :editor="editor" />
</template>
<style scoped>
hr {
  margin: 0 !important;
}
.is-active {
  background: crimson !important;
  color: white !important;
}
button {
  border: none !important;
  background: transparent !important;
  border-radius: 7px;
}
em {
  font-size: 1.2em;
}
.conteneur {
  padding: 0.5em 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
