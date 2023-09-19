<script lang='ts'>
  import type { Section } from '../types/typegen/graphql'

  export let section: Section
  export let open = false
  export let activeModule: string
  export let sectionCompleted: boolean = false
  export let padding = false
  export let showComplete = false
  export let handleModuleClick: (id: string) => void

  const toggleActive = () => open = !open
</script>

<div class='course-section'>
  <div
    class='flex items-center justify-between border-b border-b-gray-100 py-5 pr-10 cursor-pointer hover:bg-gray-50'
    class:pl-10={padding}
    on:click={toggleActive}
    on:keypress={toggleActive}
    role='button'
    tabindex="-1">

    <span class='font-light'>
      {section.title}
    </span>

    <img
      class={open ? 'w-4 rotate-180 transition-transform' : 'w-4 transition-transform'}
      src='/carrot-down-xs.svg'
      alt=''
      aria-hidden
    />
  </div>

  {#if open}
    <div class='pt-5 pr-10' class:pl-10={padding}>
      {#each section.modules_v2 as { id, title }, index }
        {@const active = activeModule === id }
        {@const activeIndex = section.modules_v2.findIndex(m => m.id === activeModule)}
        {@const moduleCompleted = index < activeIndex}
        {@const enabled = active || moduleCompleted || sectionCompleted}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class='flex items-center mb-5 cursor-pointer' on:click={() => handleModuleClick(id)}>

          {#if showComplete && moduleCompleted || showComplete && sectionCompleted}
            <img class='w-2.5 mr-3' src='/check-xs.svg' alt='' />

          {:else if !moduleCompleted && !active}
            <img class='w-2.5 mr-3 opacity-30' src='/lock.svg' alt='' />

          {:else}
            <div class='w-3 h-3 rounded-full mr-3 border border-gray-400' />
          {/if}

          <p
            class={enabled ? 'text-black text-sm font-light' : 'font-light text-gray-500 text-sm'}
            class:font-medium={active && !sectionCompleted}
          >
            {title}
          </p>
        </div>
      {/each}
    </div>
  {/if}
</div>