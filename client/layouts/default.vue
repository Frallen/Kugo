<template>
  <Navbar></Navbar>
  <div>
    <slot></slot>
  </div>
  <transition name="fade">
    <Preloader v-show="isLoading"></Preloader>
  </transition>
  <transition name="fade">
    <Modal :isShow="authModalState" @closeModal="AuthModalChanger(false)">
      <Form @submit="auth" v-slot="{ handleReset }" class="form" :validation-schema="typeForm?AuthSchema():RegSchema()"
            @click.stop>
        <div class="form-title">{{
            typeForm ? "Авторизация" : "Регистрация"
          }}
        </div>
        <div class="form-body">
          <label for="email" class="form-body-item">
            <span class="title">Почта</span>
            <Field
                name="email"
                id="email"
                type="email"
                v-slot="{ valid, meta, field }"
            >
              <input
                  v-bind="field"
                  class="input"
                  :class="{ 'input-error': meta.touched && !meta.valid }"
              />
            </Field>
            <ErrorMessage name="email" class="error"/>
          </label>
          <label for="password" class="form-body-item">
            <span class="title">Пароль</span>
            <span class="password-section">
            <Field
                name="password"
                id="password"
                :type="passwordState"
                v-slot="{ valid, meta, field }"
            >

              <input
                  v-bind="field"
                  class="input" :type="passwordState"
                  :class="{ 'input-error': meta.touched && !meta.valid }"
              />
            </Field>
              <span class="password">
              <Icon
                  name="mdi:eye-outline"
                  class="icon"
                  v-if="passwordState==='password'"
                  @click.stop="passwordState='text'"
              />
              <Icon
                  v-else
                  name="mdi:eye-off-outline"
                  class="icon"
                  @click.stop="passwordState='password'"
              />
            </span>
            </span>
            <ErrorMessage name="password" class="error"/>


          </label>
          <button type="submit" class="button button-primary">{{
              typeForm ? "Авторизоваться" : "Зарегистрироваться"
            }}
          </button>
          <div class="type-form" @click.stop="typeForm?typeForm=false:typeForm=true;handleReset()">
            {{ typeForm ? "Нет аккаунта?" : "Уже есть аккаунт?" }}
          </div>
        </div>
      </Form>
    </Modal>
  </transition>
</template>

<script setup lang="ts">
import {Form, Field, ErrorMessage} from "vee-validate"

const {getFilters} = useCatalog();
const {isLoading, authModalState} = storeToRefs(useMain())
const {AuthModalChanger} = useMain()
const {isAuth} = storeToRefs(useUser())
const {createUser, authUser, userStatus} = useUser()

const passwordState = useState<string>(() => "password")
const typeForm = useState<boolean>(() => true)

await getFilters()
await userStatus()


const auth = (data: { email: string, password: string }) => {
  if (typeForm.value) {
    authUser(data.email, data.password)
  } else {
    createUser(data.email, data.password)
  }
}
</script>

<style lang="less">

</style>
