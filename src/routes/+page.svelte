<script lang='ts'>
  import { color } from '$lib/state/color.js'

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

<div class='w-full lg:flex flex-col'>
  <!--Hero Section-->
  <section class='w-full lg:flex items-center justify-between mx-auto px-10 py-10 lg:py-10 lg:px-28 border-b border-b-gray-100'>
    <div class='max-w-sm'>
      <h1 class='font-bold text-3xl lg:text-5xl'>
        Learn the Bible like <span class='text-cornflower'>never</span> before!
      </h1>

      <p class='my-5 mb-8 font-light text-gray-600 max-w-sm'>
        Verbx is the world's first platform for immersive interactive bible study experiences.
      </p>

      <div class='flex items-center'>
        <button class='bg-black text-white py-3 px-5 rounded-xl mr-5 hover:bg-cornflower font-semibold'>Get Started</button>

        <button class='flex items-center font-semibold'>
          Learn More <img class='ml-3 'src='/arrow-right-xs.svg' aria-hidden alt='' />
        </button>
      </div>
    </div>

    <img
      class='hidden lg:block max-w-md h-auto'
      src='/hero.svg'
      alt='A playful assortment of colorful shapes, and icons.'
    />
  </section>

  <!--Bible Studies Section-->
  <section class='px-10 py-10 lg:py-16 lg:pb-20 lg:px-28'>
    <h1 class='font-bold lg:text-2xl mb-8'>Bible Courses</h1>

    <div class='mt-0 grid gap-y-6 grid-cols-3'>
      {#if courses?.length}
        {#each courses as course}
          {@const randColor = getRandomHSLColor()}
          <a href='/course/{course.id}' on:click={() => color.set(randColor)}>
            <div class='w-[280px] cursor-pointer hover:scale-105 transition-transform'>
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
  <section class='flex flex-col lg:flex-row lg:items-center justify-between px-10 py-10 lg:py-16 lg:pb-20 lg:px-28 border-t border-t-gray-100'>
    <div class='max-w-md mb-5 lg:mb-0'>
      <h1 class='font-bold text-4xl mb-4'>Get notified when we're launching.</h1>
      <p class='font-light max-w-xs text-gray-600'>Receive the latest Verbx news and updates straight to your inbox.</p>
    </div>

    <form>
      <label for="email-address" class="sr-only">Email address</label>
      <input class='min-w-0 w-80 flex-auto rounded-xl border-0 px-5 py-2.5 text-black mr-2 ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cornflower sm:text-sm sm:leading-6' type='email' name="email" id="email-address" placeholder='Enter your email' autocomplete="email" required />
      <button class='bg-black text-white px-5 py-2.5 mt-5 rounded-xl font-semibold hover:bg-cornflower focus:bg-cornflower focus:outline-none'>Notify me</button>
    </form>
  </section>
</div>