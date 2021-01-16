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
            <v-form
              ref="form"
            >
                <v-card-text>
                    <v-container>
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
                            <v-col cols="12">
                                <v-switch
                                  v-model="autoLogin"
                                  :disabled="logging"
                                  label="自动登录"
                                ></v-switch>
                            </v-col>
                        </v-row>
                    </v-container>
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
                password: val => ((val || "").length > 0 && (val || "").indexOf(" ") == -1) || '密码不能为空'
            },
            autoLogin: false,
            showPassword: false,
            uid: "",
            password: ""
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