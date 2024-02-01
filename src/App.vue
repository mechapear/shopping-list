<script setup>
import { ref } from 'vue'

const itemName = ref('')
const quantity = ref('')
const category = ref('')

const shoppingList = ref([
  {
    id: 1,
    name: 'Apple',
    quantity: 2,
    category: 'Fruits',
  },
])

function handleAddNewItem() {
  // Create a new item
  const newItem = {
    id: new Date().getTime(),
    name: itemName.value,
    quantity: quantity.value,
    category: category.value,
  }
  // Add a new item to the shopping list
  shoppingList.value.push(newItem)
  // Clear input fields
  itemName.value = ''
  quantity.value = ''
  category.value = ''
}
</script>

<template>
  <h1>Shopping List</h1>
  <!-- .prevent = prevent default -->
  <form @submit.prevent="handleAddNewItem">
    <!-- v-model.trim => remove any whitespace -->
    <input
      v-model.trim="itemName"
      type="text"
      name="itemName"
      placeholder="add new item"
      class="border border-gray-300"
    />

    <label>
      <span>Quantity</span>
      <input
        v-model.trim="quantity"
        type="text"
        name="quantity"
        class="border border-gray-300"
      />
    </label>
    <label>Category</label>

    <input
      v-model.trim="category"
      type="text"
      name="category"
      list="category"
      class="border border-gray-300"
    />
    <!-- Using datalist for a pre-defined options for an input element -->
    <datalist id="category">
      <option value="Fruits" />
      <option value="Vegetables" />
      <option value="Dairy" />
      <option value="Bread & baked" />
      <option value="Meat" />
      <option value="Fish&Seafood" />
      <option value="Canned goods" />
      <option value="Pasta/rice" />
      <option value="Cereals" />
      <option value="Condiments & Spices" />
      <option value="Frozen foods" />
      <option value="Snacks" />
      <option value="Beverages" />
      <option value="Household" />
      <option value="Cleaning" />
      <option value="Personal care" />
      <option value="Pet care" />
      <option value="Others" />
    </datalist>

    <!-- Disable the button when there is no centent using v-bind -->
    <button
      :disabled="itemName.length === 0"
      type="submit"
      class="border border-gray-300"
    >
      Add new item
    </button>
  </form>

  <!-- Display shopping list-->
  <ul>
    <li v-for="item in shoppingList" :key="item.id">
      {{ item.name }} - {{ item.quantity }} - {{ item.category }}
    </li>
  </ul>
</template>
