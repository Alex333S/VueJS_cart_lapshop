<!--Review component-->
<template>
    <div class="review">
        <h2 class="review__title">{{ formVisible ? 'Add Review' : 'Reviews' }}</h2>
        <div v-if="formVisible">
            <!--Review form-->
            <form class="review__form" @submit.prevent="submitForm">
                <div class="review__form-group">
                    <label class="review__form-label" for="name">Name:</label>
                    <input class="review__form-input" type="text" id="name" v-model="name" />
                    <span v-if="errors.name" class="review__form-error">{{ errors.name }}</span>
                </div>
                <!--Rating-->
                <div class="review__form-group">
                    <label class="review__form-label" for="rating">Rating:</label>
                    <select class="review__form-select" id="rating" v-model.number="rating">
                        <option value="1">1 (very bad) </option>
                        <option value="2">2 (bad)</option>
                        <option value="3">3 (ok)</option>
                        <option value="4">4 (good)</option>
                        <option value="5">5 (very good)</option>
                    </select>
                    <span v-if="errors.rating" class="review__form-error">{{ errors.rating }}</span>
                </div>
                <!--Check if boxes of form have content -->
                <div class="review__form-group">
                    <label class="review__form-label" for="review">Review:</label>
                    <textarea class="review__form-textarea" id="review" v-model="review"></textarea>
                    <span v-if="errors.review" class="review__form-error">{{ errors.review }}</span>
                </div>
                <!--Submit button-->
                <button class="review__form-submit" type="submit">Submit</button>
            </form>
        </div>
        <!--Switch between Reviews and Review form-->
        <div v-else>
            <ul class="review__list">
                <li v-for="(review, index) in reviews" :key="index">
                    <p><strong>Name:</strong> {{ review.name }}</p>
                    <p><strong>Rating:</strong> {{ review.rating }}</p>
                    <p><strong>Review:</strong> {{ review.review }}</p>
                </li>
            </ul>
        </div>
        <button class="review__toggle" @click="toggleForm">{{ formVisible ? 'View Reviews' : 'Add Review' }}</button>
    </div>
</template>

<script>
//Review component script (vue 3 syntax)
export default {
    name: "ReviewComponent",
    data() {
        return {
            name: "",
            rating: null,
            review: "",
            errors: {},
            reviews: [],
            formVisible: true,
        };
    },
    methods: {
        //submit form function. Checks if all fields are filled in. If not, error message is displayed. If all fields are filled in, the review is added to the reviews array and the form is cleared.
        submitForm() {
            this.errors = {};
            if (!this.name) {
                this.errors.name = "Name is required.";
            }
            if (!this.rating) {
                this.errors.rating = "Rating is required.";
            }
            if (!this.review) {
                this.errors.review = "Review is required.";
            }
            if (Object.keys(this.errors).length === 0) {
                const review = {
                    name: this.name,
                    rating: this.rating,
                    review: this.review,
                };
                this.reviews.push(review);
                this.name = "";
                this.rating = null;
                this.review = "";
                this.formVisible = false;
            }
        },
        //toggle form function. Switches between the review form and the reviews list.
        toggleForm() {
            this.formVisible = !this.formVisible;
        },
    },
};
</script>

<style scoped>
/*styling review*/
.review {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.review__title {
    font-size: 25px;
    margin-top: 20px;
    margin-bottom: 1rem;
}
/*styling form*/
.review__form {
    display: flex;
    flex-direction: column;
    align-items: center;
}
/*styling toggle button between form and reviews*/
.review__toggle {
    margin-top: 20px;
    font-size: 18px;
    background-color: rgb(224, 242, 248);
    border: none;
    padding: 10px 20px;
    cursor: pointer;
}
/*styling review list*/
.review__list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.review__list li {
    margin-bottom: 20px;
    border: 1px solid #ccc;
    padding: 10px;
}
/*review form styling*/
.review__form {
    width: 100%;
    max-width: 600px;
    padding: 2rem;
    background-color: #f5f5f5;
    border-radius: 0.5rem;
}

.review__form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    width: 100%;
}

.review__list {
    margin-top: 2rem;
}

.review__list ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.review__list li {
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: #f5f5f5;
    border-radius: 0.5rem;
}

.review__form-label {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}
/*style for input, select and textbox in review form*/
.review__form-input,
.review__form-select,
.review__form-textarea {
    font-size: 1.2rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    width: 100%;
}

.review__form-select {
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1.5rem 1.5rem;
    padding-right: 2rem;
}

.review__form-textarea {
    height: 10rem;
    resize: vertical;
}

.review__form-error {
    color: red;
    font-size: 1.2rem;
    margin-top: 0.5rem;
}
/*submit button */
.review__form-submit {
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}

.review__form-submit:hover {
    background-color: #0069d9;
}
</style>
