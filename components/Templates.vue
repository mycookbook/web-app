<template>
    <div>
        <div>
            <div>
                <div class="ui small red circular label">BETA</div>
                <br /><br />
                <div>
                    Using a template is a great way to help you quickly create a
                    boilerplate description for your new recipe. To see it on action, copy
                    the contents and paste in the
                    <NuxtLink to="/dashboard?tab=Recipes"><b>recipe editor</b> page.</NuxtLink>
                </div>
                <div v-if="!isLoggedIn" class="ui mini warning message">
                    In order to use these templates, you need to
                    <NuxtLink to="/signin">signin</NuxtLink>
                </div>
            </div>
            <br />
            <div>
                <div class="ui message">
                    <span style="float: right !important">
                        <WidgetCopyCopiedButtons :htmlTagId="'stepsstyle'" />
                    </span>
                    <div class="header">
                        <em>Step by step</em>
                    </div>
                    <br />
                    <div id="stepsstyle">
                        <h4>Step 1</h4>
                        <div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                        <h4>Step 2</h4>
                        <div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                        <h4>Step 3</h4>
                        <div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="ui message">
                    <span style="float: right !important">
                        <WidgetCopyCopiedButtons :htmlTagId="'liststyle'" />
                    </span>
                    <div class="header">
                        <em>Shopping list</em>
                    </div>
                    <br />
                    <div id="liststyle">
                        <h4>Using this method</h4>
                        <div>
                            <ul>
                                <li>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </li>
                                <li>
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                    laboris nisi ut aliquip ex ea commodo consequat.
                                </li>
                                <li>
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore eu fugiat nulla pariatur.
                                </li>
                                <li>
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                    qui officia deserunt mollit anim id est laborum.
                                </li>
                            </ul>
                        </div>
                        <h4>Using the other method</h4>
                        <div>
                            <ul>
                                <li>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </li>
                                <li>
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                    laboris nisi ut aliquip ex ea commodo consequat.
                                </li>
                                <li>
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore eu fugiat nulla pariatur.
                                </li>
                                <li>
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                    qui officia deserunt mollit anim id est laborum.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="ui message">
                    <span style="float: right !important">
                        <WidgetCopyCopiedButtons :htmlTagId="'storyteller'" />
                    </span>
                    <div class="header">
                        <em>Story teller</em>
                    </div>
                    <br />
                    <div id="storyteller">
                        <br />
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat.
                        </div>
                        <br />
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat.
                        </div>
                        <br />
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br />
    </div>
</template>

<script lang="ts">
export default {
    computed: {
        isLoggedIn() {
            return this.$store.state.access_token
        },
    },
}
</script>
