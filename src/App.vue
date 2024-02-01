<script setup>
import { ref, computed } from 'vue'

const itemName = ref('')
const quantity = ref('')
const category = ref('')
const showPurchasedItem = ref(false)

const shoppingList = ref([
  {
    id: 1,
    name: 'Apple',
    quantity: 2,
    category: 'Fruits',
    purchased: false,
  },
])

// Computed ref - update real time
const unpurchasedItemList = computed(() => {
  return shoppingList.value.filter((item) => !item.purchased)
})
const purchasedItemList = computed(() => {
  return shoppingList.value.filter((item) => item.purchased)
})

const countAll = computed(() => shoppingList.value.length)
const countPurchased = computed(() => purchasedItemList.value.length)

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
      placeholder="add category"
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
  <!-- Unpurchased Item List -->
  <ul>
    <li v-for="item in unpurchasedItemList" :key="item.id">
      <input v-model="item.purchased" type="checkbox" />
      <span>{{ item.name }} - {{ item.quantity }} - {{ item.category }}</span>
      <button @click="handleDeleteItem(item.id)">Delete</button>
    </li>
  </ul>

  <!-- Purchased Item List -->
  <div>
    <button @click="showPurchasedItem = !showPurchasedItem" type="button">
      {{ showPurchasedItem ? 'Hide' : 'Show' }}
    </button>
    <p>Purchased item</p>
  </div>

  <!-- Hide or show the purchased item list depends on the value of showPurchasedItem -->
  <!-- If it is true, display the list -->
  <ul v-if="showPurchasedItem">
    <li v-for="item in purchasedItemList" :key="item.id">
      <input v-model="item.purchased" type="checkbox" />
      <span>{{ item.name }} - {{ item.quantity }} - {{ item.category }}</span>
      <button @click="handleDeleteItem(item.id)">Delete</button>
    </li>
  </ul>

  <p>Purchased {{ countPurchased }} of {{ countAll }} items</p>
</template>
