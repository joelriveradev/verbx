<script lang='ts'>
  import '../../../app.postcss'

  import type { PageData, ActionData } from './$types'
  import { getCurrentSection, getCurrentModule } from '../../../helpers'
  import { CourseSection, ArrowLeft, ArrowRight, ArrowUp } from '../../../components'
  import { enhance } from '$app/forms'

  import clsx from 'clsx'

  export let data: PageData
  export let form: ActionData

  const { bibleStudy: course } = data

  $: activeSection = course?.sections && getCurrentSection(course.sections)
  $: activeModule  = activeSection && getCurrentModule(activeSection)
  $: submitted     = false
  $: isloading     = false
  $: answer        = ''
  $: disabled      = answer === ''

  const handleModuleClick = (id: string) => {
    if(activeSection){
      activeModule = getCurrentModule(activeSection, id)
    }
  }
</script>

<div class='flex items-start justify-between h-screen'>
  {#if course}
    <div class='border-r border-r-gray-100 w-1/2 h-screen'>
      <header class='p-10 border-b border-b-gray-100'>
        <a class='text-xs text-gray-500 hover:underline flex items-center' href='/course/{course.id}'>
          <img class='w-4 mr-2' src='/arrow-left-xs.svg' aria-hidden alt='' />
          Overview
        </a>

        <h1 class='font-bold text-2xl mt-4'>
          {course?.title}
        </h1>
      </header>

      <nav>
        <ul>
          {#each course.sections as section, i}
            <CourseSection
              activeModule={activeModule?.id || ''}
              {section}
              {handleModuleClick}
              open={i === 0}
              padding={true}
            />
          {/each}
        </ul>
      </nav>
    </div>

    <main class='w-3/4 h-full p-10'>
      <div class='max-w-xl'>
        {#if activeModule}
          {@const { id, __typename, title } = activeModule }

          <!--Navigation Buttons-->
          <div class='flex items-center'>
            <button>
              <ArrowLeft classname='w-3 mr-4' disabled />
            </button>

            <button>
              <ArrowRight classname='w-3' disabled />
            </button>
          </div>

          <!--Section Modules-->
          {#if __typename === 'Introduction'}
            <h1 class='font-semibold text-lg mt-5 mb-3'>{title}</h1>
            <p class='font-light'>{activeModule.text.text}</p>
          {/if}

          {#if __typename === 'Question'}
            {@const { type, question, verses } = activeModule }
            {@const src = (type === 'Question' ? '/book.svg': '/spark.svg')}

            <header>
              <div class='flex items-start mt-5 mb-3'>
                <img class='pt-1 w-5 mr-3' {src} alt='' aria-hidden />
                <h1 class='font-medium text-lg'>{question}</h1>
              </div>
            </header>

            {#each verses as { text } }
              <p class='mt-3 text-xl text-gray-500 font-light'>
                {text?.text}
              </p>
            {/each}

            <form
              action='?/updateModule'
              method='POST'
              use:enhance={() => {
                isloading = true

                return async ({ result, update }) => {
                  if(result.type == 'success'){
                    isloading = false
                    submitted = true
                    await update()
                  }
                }
              }}>
              <div class='flex items-center justify-center mt-5'>
                <input type='hidden' name='moduleId'  value='{activeModule?.id}' />
                <input type="hidden" name='sectionId' value='{activeSection?.id}' />

                {#if type === 'Question'}
                  <input
                    required
                    name='answer'
                    class='w-full mr-3 border border-black p-2 pb-2.5 px-3 font-light rounded-xl focus:outline-black'
                    type='text'
                    placeholder='Type your answer here'
                    value='{form?.answer ?? ''}'
                    on:change={(event) => {
                      answer = event.currentTarget.value
                    }}
                  />

                  {:else if type === 'CriticalThinking'}
                  <textarea
                    class='w-full mr-3 border border-black p-3 pb-3.5 font-light rounded-xl'
                    placeholder="Type your answer here"
                    required
                  />
                {/if}

                {#if !isloading}
                  <button
                    type='submit'
                    disabled={disabled}
                    class={
                      clsx({
                        'w-5 h-5 rounded-full flex items-center justify-center hover:scale-110 transition-all shrink-0': true,
                        'bg-black': !disabled,
                        'bg-[#DEFFF5]': submitted,
                        'bg-gray-300 cursor-not-allowed': disabled
                      })
                    }>
                    {#if submitted}
                      <img src='/submitted.svg' alt='' />
                      {:else}
                        <ArrowUp variant='light' classname='w-2' />
                    {/if}
                  </button>
                  {:else}
                    <img class='w-5 h-5 mt-4 animate-spin' src='/spinner.svg' alt='rotating spinner icon' />
                {/if}
              </div>
            </form>

            {#if form?.response}
              <small class='mt-4 text-sm block'>
                {form.response}
              </small>
            {/if}
          {/if}
        {/if}
      </div>
    </main>
  {/if}
</div>