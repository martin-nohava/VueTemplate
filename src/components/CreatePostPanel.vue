<template>
    <!--@submit.prevent is disabling default event of form element and adding custom-->
    <!--class exceeded is added when condition is met-->
    <form class="create-post-panel" @submit.prevent="createNewPost" :class="{'exceeded': newPostCharacterCount > 69}">
        <label for="newPost"><strong>New Post</strong> ({{newPostCharacterCount}}/69) </label>
        <!--V-model is saving value of textfield to selected variable-->
        <textarea id="newPost" rows="4" v-model="newPostContent"/>
    
        <div class="create-post-panel_submit">    
            <div class="create-post-type">
                <label for="newPostType"><strong>Type:</strong></label>
                <select id="newPostType" v-model="selectedPostType">
                    <!--Using index of array as unique key parametr-->
                    <option v-for="(option, index) in postTypes" :key="index" :value="option.value">
                        {{option.name}}
                    </option>
                </select>
            </div>
            <button>
                Post It!
            </button>
        </div>
    </form>
</template>

<script>
export default {
    name: 'CreatePostPanel',
    data() {
        return {
            newPostContent: '',
            selectedPostType: 'instant',
            postTypes: [
                {
                    value: 'draft',
                    name: 'Draft'
                },
                {
                    value: 'instant',
                    name: 'Instant Post'
                }
            ],
        }
    },
    computed: {
        newPostCharacterCount() {
        return this.newPostContent.length;
        }
    },
    methods: {
        createNewPost() {
            if(this.newPostContent && this.selectedPostType !== 'draft') {
                this.$emit('add-post', this.newPostContent)
            }
            this.newPostContent = '';
        },
    }
}
</script>

<style lang="scss" scoped>
.create-post-panel {
    margin-top: 20px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;

    textarea {
        border: 1px solid whitesmoke;
        border-radius: 5px;
    }

    .create-post-panel_submit {
        display: flex;
        justify-content: space-between;

        .create-post-type {
            padding: 10px 0;
        }

        button {
            padding: 5px 20px;
            margin: auto 0;
            border-radius: 5px;
            border: none;
            background-color: deeppink;
            color: white;
            font-weight: bold;
        }
    }

    &.exceeded {
        color: red;
        border-color: red;

        .create-post-panel_submit {
            button {
                background-color: red;
                color: white;
            }
        }

    }
}
</style>