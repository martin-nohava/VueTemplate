<template>
    <!--@submit.prevent is disabling default event of form element and adding custom-->
    <!--class exceeded is added when condition is met-->
    <form class="create-post-panel" @submit.prevent="createNewPost" :class="{'exceeded': newPostCharacterCount > 69}">
        <label for="newPost"><strong>New Post</strong> ({{newPostCharacterCount}}/69) </label>
        <!--V-model is saving value of textfield to selected variable-->
        <textarea id="newPost" rows="4" v-model="state.newPostContent"/>
    
        <div class="create-post-panel_submit">    
            <div class="create-post-type">
                <label for="newPostType"><strong>Type:</strong></label>
                <select id="newPostType" v-model="state.selectedPostType">
                    <!--Using index of array as unique key parametr-->
                    <option v-for="(option, index) in state.postTypes" :key="index" :value="option.value">
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
import {reactive, computed} from 'vue';
//Created with composition API
export default {
    name: 'CreatePostPanel',
    setup(props, ctx) {
        const state = reactive({
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
            ]
        })

        const newPostCharacterCount = computed(() => state.newPostContent.length)

        function createNewPost() {
            if(state.newPostContent && state.selectedPostType !== 'draft') {
                ctx.emit('add-post', state.newPostContent)
            }
            state.newPostContent = '';
        }
        
        return {
            state,
            newPostCharacterCount,
            createNewPost
        }
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