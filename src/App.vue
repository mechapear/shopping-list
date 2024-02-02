<script setup>
import DeleteIcon from '@/icons/DeleteIcon.vue'
import ArrowRightIcon from './icons/ArrowRightIcon.vue'
import ArrowDownIcon from './icons/ArrowDownIcon.vue'
import NewItemForm from '@/components/NewItemForm.vue'
import { ref, computed, watch } from 'vue'

// Get the shopping list from the local storage
// If it is null, set it to an empty array
const shoppingList = ref(JSON.parse(localStorage.getItem('shoppingList')) || [])
const showPurchasedItem = ref(true)

// Computed ref - update real time
const unpurchasedItemList = computed(() => {
  return shoppingList.value.filter((item) => !item.purchased)
})
const purchasedItemList = computed(() => {
  return shoppingList.value.filter((item) => item.purchased)
})

const countAll = computed(() => shoppingList.value.length)
const countPurchased = computed(() => purchasedItemList.value.length)

// If the shopping list is changed, save it to the local storage
watch(
  shoppingList,
  (newShoppingList) => {
    localStorage.setItem('shoppingList', JSON.stringify(newShoppingList))
  },
  // Prevent the watcher from not watching .push()
  { deep: true },
)

function updateShoppingList(newList) {
  shoppingList.value = newList
}

function handleDeleteItem(id) {
  // Filter out the item with the given id
  shoppingList.value = shoppingList.value.filter((item) => item.id !== id)
}
</script>

<template>
  <div class="grid place-content-center gap-8 p-6">
    <h1 class="py-3 text-left text-2xl font-semibold">Shopping List</h1>

    <NewItemForm
      :shoppingList="shoppingList"
      @updateShoppingList="updateShoppingList"
    />

    <!-- Display shopping list-->
    <!-- Unpurchased Item List -->
    <ul class="divide-y divide-gray-100">
      <li
        v-for="item in unpurchasedItemList"
        :key="item.id"
        class="grid grid-cols-7 items-center py-3"
      >
        <div class="col-span-3 flex items-center">
          <input
            v-model="item.purchased"
            type="checkbox"
            class="mr-2 rounded-full border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0 md:mr-3"
          />
          <p>
            {{ item.name }}
            <span class="text-sm text-gray-500">x {{ item.quantity }}</span>
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

    <!-- Purchased Item List -->
    <section>
      <div
        class="border-y border-gray-100 py-4 text-gray-400 hover:text-gray-900"
      >
        <button
          @click="showPurchasedItem = !showPurchasedItem"
          type="button"
          class="w-full text-start"
        >
          <ArrowDownIcon v-if="showPurchasedItem" />
          <ArrowRightIcon v-else />
          Purchased <span class="font-medium">{{ countPurchased }}</span> of
          <span class="font-medium">{{ countAll }}</span> items
        </button>
      </div>

      <!-- Hide or show the purchased item list depends on the value of showPurchasedItem -->
      <!-- If it is true, display the list -->
      <ul v-if="showPurchasedItem" class="divide-y divide-gray-100">
        <li
          v-for="item in purchasedItemList"
          :key="item.id"
          class="grid grid-cols-7 items-center py-3"
        >
          <div class="col-span-3 flex items-center">
            <input
              v-model="item.purchased"
              type="checkbox"
              class="mr-2 rounded-full border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0 md:mr-3"
            />
            <p class="text-gray-400 line-through">
              {{ item.name }}
              <span class="text-gray-300">x {{ item.quantity }}</span>
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
    </section>
  </div>
</template>
