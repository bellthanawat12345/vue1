<template>
    <div class="min-h-screen p-6 bg-gray-100">
        <div class="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h1 class="mb-6 text-2xl font-bold text-center text-blue-600">Firebase Realtime Database CRUD</h1>
            <div class="mb-4">
                <input v-model="newItem.name" placeholder="Enter item name"
                    class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button @click="createItem"
                    class="w-full p-2 mt-2 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600">
                    Add Item
                </button>
            </div>

            <div class="mb-6">
                <input v-model="newItem2.name" placeholder="Enter Update"
                    class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>

            <ul class="space-y-4">
                <li v-for="item in items" :key="item.id"
                    class="flex items-center justify-between p-4 rounded-lg shadow bg-gray-50">
                    <span>{{ item.name }}</span>
                    <div class="space-x-2">
                        <button @click="deleteItem(item.id)"
                            class="p-2 text-white transition bg-red-500 rounded-lg hover:bg-red-600">
                            Delete
                        </button>
                        <button @click="updateItem(item.id, newItem2.name)"
                            class="p-2 text-white transition bg-yellow-500 rounded-lg hover:bg-yellow-600">
                            Update
                        </button>
                    </div>
                </li>
            </ul>

            <div class="mt-8">
                <h2 class="mb-4 text-xl font-semibold text-center text-green-600">LED Control</h2>
                <div class="flex justify-between space-x-4">
                    <button @click="toggleLED(true)"
                        class="w-full p-3 text-white transition bg-green-500 rounded-lg hover:bg-green-600">
                        Turn LED On
                    </button>
                    <button @click="toggleLED(false)"
                        class="w-full p-3 text-white transition bg-gray-500 rounded-lg hover:bg-gray-600">
                        Turn LED Off
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { ref, push, onValue, remove, update, set } from 'firebase/database';
import { realtime } from '../firebase';
export default {
    name: 'RealtimeDatabaseCrud',
    data() {
        return {
            newItem: {
                name: ''
            },
            newItem2: {
                name: ''
            },
            items: [],
            ledStatus: false
        }
    },
    mounted() {
        const itemsRef = ref(realtime, 'items');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                this.items = Object.keys(data).map(key => ({ id: key, ...data[key] }));
            } else {
                this.items = [];
            }
        });

        // Get the current LED status
        const ledRef = ref(realtime, 'led');
        onValue(ledRef, (snapshot) => {
            this.ledStatus = snapshot.val();
        });
    },
    methods: {
        async createItem() {
            if (this.newItem.name.trim()) {
                const itemsRef = ref(realtime, 'items');
                await push(itemsRef, this.newItem);
                this.newItem.name = '';
            }
        },
        async deleteItem(id) {
            const itemRef = ref(realtime, `items/${id}`);
            await remove(itemRef);
        },
        async updateItem(id, newName) {
            const itemRef = ref(realtime, `items/${id}`);
            await update(itemRef, { name: newName });
            this.newItem2.name = '';
        },
        async toggleLED(status) {
            const ledRef = ref(realtime, 'led');
            await set(ledRef, status);
        }
    }
}
</script>