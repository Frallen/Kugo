<template>
  <div>
  <Navbar></Navbar>
  <div class="page-wrapper">
    <div class="container">
      <Breadcrumbs></Breadcrumbs>
    </div>
    <slot></slot>
  </div>
  <Footer></Footer>
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
  <transition name="fade">
    <Modal :isShow="serviceModalState" @closeModal="ServiceModalChanger(false)">
      <Form @click.stop
            :validation-schema="ServiceSchema()"
            @submit="onSubmit"
            v-slot="{ setFieldValue, setValues }"
            class="form">
        <div class="form-title">Обратная связь
        </div>
        <div class="form-body">
          <label for="Option" class="form-body-item">
            <span class="title">Причина обращения</span>
            <Field name="Option" id="Option" hidden="hidden">
            </Field>
            <Select :options="CallBackOptions" placeholder="" @selectValue="e=> {setFieldValue('Option',e)}"></Select>
            <ErrorMessage name="Option" class="error"/>
          </label>
          <label for="Phone" class="form-body-item">
            <span class="title">Номер телефона</span>
            <Field
                name="Phone"
                id="Phone"
                v-slot="{ valid, meta, field }"
            >

              <input
                  placeholder="7900000000"
                  v-bind="field"
                  class="input" type="text"
                  :class="{ 'input-error': meta.touched && !meta.valid }"
              />
            </Field>
            <ErrorMessage name="Phone" class="error"/>
          </label>
          <button type="submit" class="button button-primary">Записаться на диагностику</button>
        </div>
      </Form>
    </Modal>
  </transition>
  </div>
</template>

<script setup lang="ts">
import {Form, Field, ErrorMessage} from "vee-validate"


const {isLoading, authModalState, serviceModalState, CallBackOptions} = storeToRefs(useMain())
const {AuthModalChanger, ServiceModalChanger, ServiceRequest} = useMain()
const {user} = storeToRefs(useUser())
const {createUser, authUser, userStatus, getFavorites} = useUser()

const passwordState = useState<string>(() => "password")
const typeForm = useState<boolean>(() => true)


if (userCookieChecker()) {
  await userStatus()
  await getFavorites()
}
const onSubmit = (values) => {
  ServiceRequest(values)
}

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
