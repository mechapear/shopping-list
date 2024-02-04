<script setup>
import DeleteIcon from '@/icons/DeleteIcon.vue'

const props = defineProps({
  shoppingList: {
    type: Array,
    required: true,
  },
  selectedList: {
    type: Array,
    required: true,
  },
  isPurchasedList: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['updateShoppingList'])

function handleDeleteItem(id) {
  // Filter out the item with the given id
  const updatedShoppingList = props.shoppingList.filter(
    (item) => item.id !== id,
  )
  // Send updatedShoppingList with updateShoppingList event to the parent component
  emit('updateShoppingList', updatedShoppingList)
}
</script>

<template>
  <ul class="divide-y divide-gray-100">
    <li
      v-for="item in selectedList"
      :key="item.id"
      class="grid grid-cols-7 items-center py-3"
    >
      <div class="col-span-3 flex items-center">
        <input
          v-model="item.purchased"
          type="checkbox"
          class="mr-2 rounded-full border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0 md:mr-3"
        />
        <p
          :style="{
            'text-decoration': isPurchasedList ? 'line-through' : 'none',
            // isPurchasedList ? text-gray-400 : text-gray-900
            color: isPurchasedList ? 'rgb(156 163 175)' : 'rgb(17 24 39)',
          }"
        >
          {{ item.name }}
          <span
            :style="{
              // isPurchasedList ? text-gray-300 : text-gray-500
              color: isPurchasedList ? 'rgb(209 213 219)' : 'rgb(107 114 128)',
              // isPurchasedList ? text-base : text-sm
              'font-size': isPurchasedList ? '1rem' : '0.875rem',
              'line-height': isPurchasedList ? '1.5rem' : '1.25rem'
            }"
            >x {{ item.quantity }}</span
          >
        </p>
      </div>
      <span
        class="col-span-3 w-fit rounded bg-indigo-50 px-1.5 py-0.5 text-xs text-indigo-800"
      >
        {{ item.category }}</span
      >
      <div
        class="mx-auto flex h-7 w-7 justify-center rounded-full hover:bg-gray-100"
      >
        <button @click="handleDeleteItem(item.id)" class="rounded-full">
          <DeleteIcon />
        </button>
      </div>
    </li>
  </ul>
</template>
