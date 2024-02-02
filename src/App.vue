<script setup>
import DeleteIcon from '@/icons/DeleteIcon.vue'
import ArrowRightIcon from './icons/ArrowRightIcon.vue'
import ArrowDownIcon from './icons/ArrowDownIcon.vue'
import { ref, computed, watch, onMounted } from 'vue'

// example of shopping list categories
const PRESET_CATEGORIES = [
  'Beverages',
  'Bread & baked',
  'Canned goods',
  'Cereals',
  'Cleaning',
  'Condiments & Spices',
  'Dairy',
  'Fish&Seafood',
  'Frozen foods',
  'Fruits',
  'Household',
  'Meat',
  'Others',
  'Pasta/rice',
  'Personal care',
  'Pet care',
  'Snacks',
  'Vegetables',
]

const itemName = ref('')
const quantity = ref('')
const category = ref('')
const shoppingList = ref([])
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

// When the component is mounted, get the shopping list from the local storage
// If it is null, set it to an empty array
onMounted(() => {
  shoppingList.value = JSON.parse(localStorage.getItem('shoppingList')) || []
})

function handleAddNewItem() {
  // Create a new item
  const newItem = {
    id: new Date().getTime(),
    name: itemName.value,
    quantity: quantity.value,
    category: category.value,
    purchased: false,
  }
  // Add a new item to the shopping list
  shoppingList.value.push(newItem)
  // Clear input fields
  itemName.value = ''
  quantity.value = ''
  category.value = ''
}

function handleDeleteItem(id) {
  // Filter out the item with the given id
  shoppingList.value = shoppingList.value.filter((item) => item.id !== id)
}
</script>

<template>
  <div class="grid place-content-center gap-8 p-6">
    <h1 class="py-3 text-left text-2xl font-semibold">Shopping List</h1>
    <!-- .prevent = prevent default -->
    <form @submit.prevent="handleAddNewItem" class="grid gap-5">
      <!-- v-model.trim => remove any whitespace -->
      <input
        v-model.trim="itemName"
        type="text"
        name="itemName"
        placeholder="Apple"
        class="block w-full rounded-lg border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-900"
            >Quantity</label
          >
          <input
            v-model.trim="quantity"
            type="number"
            name="quantity"
            placeholder="1"
            class="block w-full rounded-lg border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div class="col-span-2">
          <label class="mb-2 block text-sm font-medium text-gray-900"
            >Category</label
          >
          <input
            v-model.trim="category"
            type="text"
            name="category"
            list="category"
            placeholder="Fruits"
            class="block w-full rounded-lg border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <!-- Using datalist for a pre-defined options for an input element -->
          <!-- Using index as a key because this option list won't be change -->
          <datalist id="category">
            <option
              v-for="(category, index) in PRESET_CATEGORIES"
              :value="category"
              :key="index"
            />
          </datalist>
        </div>
      </div>

      <!-- Disable the button when there is no centent using v-bind -->
      <button
        :disabled="itemName.length === 0"
        type="submit"
        class="block w-full rounded-lg bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Add new item
      </button>
    </form>

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
