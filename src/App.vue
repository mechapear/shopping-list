<script setup>
// import DeleteIcon from '@/icons/DeleteIcon.vue'
import ArrowRightIcon from './icons/ArrowRightIcon.vue'
import ArrowDownIcon from './icons/ArrowDownIcon.vue'
import NewItemForm from '@/components/NewItemForm.vue'
import ShoppingList from '@/components/ShoppingList.vue'
import { ref, computed, watch } from 'vue'

// Get the shopping list from the local storage
// If it is null, set it to an empty array
const shoppingList = ref(
  JSON.parse(localStorage.getItem('shoppingList'))
    ? JSON.parse(localStorage.getItem('shoppingList'))
    : [],
)
const showPurchasedItem = ref(false)

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
</script>

<template>
  <div class="grid place-content-center gap-8 p-6">
    <h1 class="py-3 text-left text-2xl font-semibold text-gray-900">
      Shopping List
    </h1>

    <NewItemForm
      :shoppingList="shoppingList"
      @updateShoppingList="updateShoppingList"
    />

    <!-- Display unpurchased item list-->
    <ShoppingList
      :shoppingList="shoppingList"
      :selectedList="unpurchasedItemList"
      :isPurchasedList="false"
      @updateShoppingList="updateShoppingList"
    />

    <!-- Display purchased item list -->
    <section>
      <!-- Toggle for hide/show purchased item list -->
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
      <ShoppingList
        v-if="showPurchasedItem"
        :shoppingList="shoppingList"
        :selectedList="purchasedItemList"
        :isPurchasedList="true"
        @updateShoppingList="updateShoppingList"
      />
    </section>
  </div>
</template>
