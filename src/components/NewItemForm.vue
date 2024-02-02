<script setup>
import { ref } from 'vue'

const props = defineProps({
  shoppingList: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['updateShoppingList'])

// Preset of shopping list categories
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
  // Props are readonly, so we need to create a new array
  const updatedShoppingList = [...props.shoppingList, newItem]
  // Send updatedShoppingList with updateShoppingList event to the parent component
  emit('updateShoppingList', updatedShoppingList)
  // Clear input fields
  itemName.value = ''
  quantity.value = ''
  category.value = ''
}
</script>

<template>
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
</template>
