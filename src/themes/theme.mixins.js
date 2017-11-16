/**
 * 主题通用 mixins
 */
export default {
  name: 'base',
  data() {
    return {
      // elelmentId: 'vm-' + Math.random().toString(36).substring(3, 10),
      roleName: this.$options.name.replace('vm-', '')
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default() {
        return this.$config && this.$config.get('mode') || 'ios'
      }
    },
    color: {
      type: String,
      default: '',
      validator(value) {
        return [
          '',
          'default',
          'primary',
          'light',
          'secondary',
          'danger',
          'dark',
          'energized',
          'royal',
          'subtle',
          'vibrant',
          'bright'
        ].indexOf(value) > -1
      }
    }
  },
  computed: {
    modeClass() {
      return (`${this.roleName} ${this.roleName}-${this.mode}`)
    },
    colorClass() {
      return this.color ? (`${this.roleName}-${this.mode}-${this.color}`) : ''
    }
  }
}
