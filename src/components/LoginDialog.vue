<template>
    <v-dialog
        v-model="isLoginDialogOpening"
        persistent
        max-width="600px"
    >
        <v-card>
            <v-card-title>
                <span class="headline">登录</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-form
              ref="form"
            >
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                type="text"
                                v-model="uid"
                                label="账号"
                                :rules="[rules.uid]"
                                :disabled="logging"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="password"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                :rules="[rules.password]"
                                @click:append="showPassword = !showPassword"
                                label="密码"
                                :disabled="logging"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-switch v-model="autoLogin" :disabled="logging" label="自动登录"></v-switch>
                        </v-col>
                        <v-col cols="6">
                            <v-checkbox v-model="acceptua" required :rules="[rules.ua]">
                                <template v-slot:label>
                                    <div>
                                        我同意
                                        <a @click="uaDialog = true">
                                            用户协议
                                        </a>
                                    </div>
                                </template>
                            </v-checkbox>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      :disabled="logging"
                      @click="isLoginDialogOpening=false"
                    >
                        关闭
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        :loading="logging"
                        @click="login"
                    >
                        登录
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>

        <v-dialog v-model="uaDialog" width="500">
            <v-card>
                <v-card-title>用户协议</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container>
                        <p class="red--text">因为真的很短所以请认真看!</p>
                        <p>1. 出于统计级排和减轻对学校服务器的压力的考虑，我<span class="red--text">需要储存的你的分数、登录到学校服务器的JSESSIONID!但不储存你的账号密码</span>。</p>
                        <p>2. 在未完全获得齐全级学生分数前，级排仅供参考，并不准确。</p>
                        <p>3. 数据可能有延时。</p>
                        <p>4. 本网页随时可能关闭(((</p>
                        <p>——版本: 20200124.01</p>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="uaDialog = false">
                        关闭
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <v-snackbar
          v-model="bar.show"
        >
            <v-icon color="red">mdi-alert-circle-outline</v-icon>
            {{ bar.text }}
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="pink"
                    text
                    v-bind="attrs"
                    @click="updateErrorBarState(false, undefined)"
                >
                    关闭
                </v-btn>
            </template>
        </v-snackbar>
    </v-dialog>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "LoginDialog",

    data: () => {
        return{
            rules: {
                uid: val => ((val || "").length == 10 && !isNaN(Number((val || ""))) && (val || "").indexOf(" ") == -1) || '请输入10位数的学号',
                password: val => ((val || "").length > 0 && (val || "").indexOf(" ") == -1) || '密码不能为空',
                ua: val => val || "你需要同意用户协议"
            },
            autoLogin: false,
            showPassword: false,
            uid: "",
            password: "",
            acceptua: false,
            uaDialog: false
        }
    },

    methods: {
        login: function () {
            if (this.$refs.form.validate()) {
                this.$store.commit("isLogging", true)
                this.$store.dispatch("login", {uid: this.uid, password: this.password, autoLogin: this.autoLogin});
            }
        },
        updateErrorBarState: function (show, text) {
            this.$store.commit("updateErrorBarState", {"show": show, "text": text});
        }
    },
    
    computed: {
        isLoginDialogOpening: {
            get () {
                return this.$store.state.login.loginDialogOpening;
            },
            set (value) {
                if (value == false) {
                  this.$refs.form.reset()
                }
                this.$store.commit("updateLoginDialogState", value);
            }
        },
        ...mapState({
            bar: state => state.login.errorBar,
            logging: state => state.login.logging,
        })
    }
}
</script>