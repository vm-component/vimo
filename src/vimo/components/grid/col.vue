<template>
    <div class="col">
        <slot></slot>
    </div>
</template>
<script type="text/ecmascript-6">
  /**
   * Property	Description
   * align-self-start	    Adds align-self: flex-start. The column will be vertically aligned at the top.
   * align-self-center	  Adds align-self: center. The column will be vertically aligned in the center.
   * align-self-end	      Adds align-self: flex-end. The column will be vertically aligned at the bottom.
   * align-self-stretch	  Adds align-self: stretch. The column will be stretched to take up the entire height of the row.
   * align-self-baseline	Adds align-self: baseline. The column will be vertically aligned at its baselines.
   * */
  export default{
    name: 'Column'
  }
</script>
