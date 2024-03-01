<script lang='ts'>
  import { color } from '$lib/state/color.js'
  import Newsletter from '$lib/components/Newsletter.svelte'

  export let data
  const { bibleStudies: courses } = data

  function getRandomHSLColor() {
    const hue = Math.floor(Math.random() * 360)
    const saturation = Math.floor(Math.random() * 41) + 20
    const lightness = Math.floor(Math.random() * 21) + 70

    return `hsl(${hue},${saturation}%,${lightness}%)`
  }
</script>

<svelte:head>
  <title>Verbx</title>

  <meta
    name='description'
    content={`The world's first platform for immersive interactive bible study experiences.`}
  />
</svelte:head>

<div>
  <!--Hero Section-->
  <section class='w-full lg:h-[400px] px-10 py-10 lg:py-10 lg:px-28 border-b border-b-gray-100 flex items-center justify-center'>
    <div class='text-center flex flex-col items-center justify-center'>
      <h1 class='font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-6xl'>
        Learn the Bible like <span class='text-cornflower'>never</span> before!
      </h1>

      <p class='my-5 mb-8 font-light text-gray-600 text-center mx-auto'>
        Verbx is the world's first platform for immersive interactive bible study experiences.
      </p>

      <div class='flex items-center'>
        <button class='bg-black text-white py-3 px-5 rounded-xl mr-5 hover:bg-cornflower font-semibold'>Get Started</button>

        <button class='flex items-center font-semibold'>
          Learn More <img class='ml-3 'src='/arrow-right-xs.svg' aria-hidden alt='' />
        </button>
      </div>
    </div>
  </section>

  <!--Bible Studies Section-->
  <section class='w-full px-10 py-10 lg:py-16 lg:pb-20 lg:px-28'>
    <h1 class='font-bold md:text-2xl mb-8'>Bible Courses</h1>

    <div class='w-full mt-0 md:grid md:gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {#if courses?.length}
        {#each courses as course}
          {@const randColor = getRandomHSLColor()}
          <a class='w-full' href='/course/{course.id}' on:click={() => color.set(randColor)}>
            <div class='w-full mb-6 lg:mb-0 cursor-pointer hover:scale-105 transition-transform'>
              <div class='w-full h-36 rounded-t-xl' style='background: {randColor}' />

              <p class='border border-gray-300 p-5 font-bold rounded-br-xl shadow-md shadow-gray-300 truncate'>
                {course.title}
              </p>
            </div>
          </a>
        {/each}
      {/if}
    </div>
  </section>

  <!--Newsletter Section-->
  <Newsletter />
</div>