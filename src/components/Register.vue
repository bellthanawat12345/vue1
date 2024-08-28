<template>
    <div class="container">
        <h1>สมัครสมาชิก</h1>

        <form @submit.prevent="handleSubmit">
            <div>
                <label for="docId">Document ID:</label>
                <input v-model="docId" type="text" id="docId" required>
            </div>
            <div class="form-group">
                <label for="name">ชื่อ:</label>
                <input type="text" id="name" v-model="name" class="form-control" required>
            </div>

            <div class="form-group">
                <label for="email">อีเมล:</label>
                <input type="email" id="email" v-model="email" class="form-control" required>
            </div>

            <div class="form-group">
                <label for="address">ที่อยู่:</label>
                <input type="text" id="address" v-model="address" class="form-control" required>
            </div>

            <button type="submit" class="btn btn-primary">สมัคร</button>
        </form>

        <button @click="getData">Get Data</button>
        <button @click="updateData">Update Data</button>
        <button @click="deleteData">Delete Data</button>
        <button @click="setData">Set Data</button>
        <div v-if="data">
            <h2>Document Data:</h2>
            <pre>{{ data }}</pre>
        </div>
    </div>
</template>

<script>
import { getFirestore, getDoc, updateDoc, doc, setDoc, deleteDoc } from 'firebase/firestore/lite';
import {auth, firestore} from '../firebase';

export default {
    data() {
        return {
                items:[],
                name: '',
                email: '',
            address: '',
            data: null,
            docId: '',
           
        };
    },
    methods: {
        async handleSubmit() {
            this.setData();
        },
            async getData() {
            const docRef = doc(firestore, "user", this.docId);
                const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                    this.data = docSnap.data();
                    console.log("Document data:", docSnap.data());
                } else {
                    console.log("No such document!");
                }
            },
            async updateData() {
                const docRef = doc(firestore, "user", this.docId);
                await updateDoc(docRef, {
                    field: "newValue"
                });
            },
            async deleteData() {
                const docRef = doc(firestore, "user", this.docId);
                await deleteDoc(docRef);
            },
            async setData() {
                const docRef = doc(firestore, "user", this.docId);
                await setDoc(docRef, {
                    name: this.name,
                    email: this.email,
                    address: this.address
                });
            },


    },
    // async created() {
    //     const querySnapshot = await getDocs(collection(firebase, 'addUser'));
    //     this.items = querySnapshot.docs.map(doc => ({
    //         id: doc.id,
    //         data: doc.data()
    //     }));
    //     console.log(this.items)
    // },
};
</script>

<style scoped>
.container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-control {
    width: 100%;
}

.btn {
    margin-top: 15px;
}
</style>