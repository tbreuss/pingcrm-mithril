import m from 'mithril'

export default {
  view: (v) => m('div.pr-6 pb-8 w-full lg:w-1/2', [
    m('label.form-label', 'Photo'),
    m('input.form-input[type=text][disabled]', {value: 'To be done'}),
  ]),
}

// <file-input v-model="form.photo" :errors="$page.errors.photo" class="pr-6 pb-8 w-full lg:w-1/2" type="file" accept="image/*" label="Photo" />
