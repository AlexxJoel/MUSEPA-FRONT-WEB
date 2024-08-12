<template>
  <div class="container  my-2 ">
    <div class="row">
      <div class="col-12 p-0" >
        <div class="separator h4">
          <slot name="title"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionDivider'
}
</script>

<style >

:root {
  --divider-label: #45505abb;
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--divider-label);
}
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--divider-label);
}
.separator:not(:empty)::before {
  margin-right: .25em;
}
.separator:not(:empty)::after {
  margin-left: .25em;
}
</style>
