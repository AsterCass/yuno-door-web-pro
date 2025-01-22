<template>

  <div class="q-mx-xl">

    <h4>
      {{ $t('main_tools_title_cn_id_card') }}
    </h4>

    <div class="row">
      <div class="col-lg-7 col-12 text-center">

        <div class="row items-center q-my-lg justify-center">

          <q-input v-for="(idCard, index) in idCardList" :key="index"
                   v-model="idCard.id" tabindex="0" dense outlined readonly
                   class="q-ma-md component-outline-dash-input-std">
            <template v-slot:append>
              <q-icon name="fa-regular fa-copy" @click="copy(idCard.id)"
                      class="cursor-pointer cask-cursor-pointer" size="1rem"/>
            </template>
          </q-input>

        </div>

        <div class="row justify-center items-center">
          <q-btn no-caps unelevated class="shadow-2 component-full-btn-std"
                 @click="generateIdCardList">
            <div class="row items-center">
              <div class="q-mx-xs">
                {{ $t('main_tools_cn_card_regenerate') }}
              </div>
            </div>
          </q-btn>
        </div>

      </div>

      <div class="col-lg-5 col-12 q-px-xl">

        <h5>
          {{ $t('main_tools_cn_card_setting_city') }}
        </h5>

        <div class="row justify-evenly items-center q-mb-md">

          <q-radio v-model="cityCode" checked-icon="task_alt" class="component-ratio-base"
                   unchecked-icon="panorama_fish_eye" val="110101"
                   :label="$t('main_tools_cn_card_setting_city_beijing')"/>
          <q-radio v-model="cityCode" checked-icon="task_alt" class="component-ratio-base"
                   unchecked-icon="panorama_fish_eye" val="310101"
                   :label="$t('main_tools_cn_card_setting_city_shanghai')"/>
          <q-radio v-model="cityCode" checked-icon="task_alt" class="component-ratio-base"
                   unchecked-icon="panorama_fish_eye" val="440303"
                   :label="$t('main_tools_cn_card_setting_city_shenzhen')"/>
          <q-radio v-model="cityCode" checked-icon="task_alt" class="component-ratio-base"
                   unchecked-icon="panorama_fish_eye" val="440103"
                   :label="$t('main_tools_cn_card_setting_city_guangzhou')"/>
          <q-radio v-model="cityCode" checked-icon="task_alt" class="component-ratio-base"
                   unchecked-icon="panorama_fish_eye" val="330102"
                   :label="$t('main_tools_cn_card_setting_city_hangzhou')"/>
          <q-radio v-model="cityCode" checked-icon="task_alt" class="component-ratio-base"
                   unchecked-icon="panorama_fish_eye" val="320102"
                   :label="$t('main_tools_cn_card_setting_city_nanjing')"/>
          <div class="row items-center">
            <q-radio v-model="cityCode" checked-icon="task_alt" class="component-ratio-base"
                     unchecked-icon="panorama_fish_eye" val=""
                     :label="$t('main_tools_cn_card_setting_city_cus')"/>

            <q-input v-if="cityCode" v-model="customCityCode" tabindex="0" dense outlined disable
                     :placeholder="$t('main_tools_cn_card_setting_city_division')"
                     class="q-my-sm q-mx-md component-outline-dash-input-mini-short" style="opacity: .8"/>
            <q-input v-else v-model="customCityCode" tabindex="0" dense outlined mask="######"
                     :placeholder="$t('main_tools_cn_card_setting_city_division')"
                     class="q-my-sm  q-mx-md component-outline-input-mini-short" style="opacity: .8"/>
          </div>

        </div>


        <h5>
          {{ $t('main_tools_cn_card_setting_birth') }}
        </h5>

        <div class="row justify-evenly items-center q-mb-md">

          <q-radio v-model="birth" checked-icon="task_alt" class="component-ratio-base"
                   unchecked-icon="panorama_fish_eye" val="random"
                   :label="$t('main_tools_cn_card_setting_birth_ram')"/>


          <div class="row items-center">
            <q-radio v-model="birth" checked-icon="task_alt" class="component-ratio-base"
                     unchecked-icon="panorama_fish_eye" val=""
                     :label="$t('main_tools_cn_card_setting_birth_cus')"/>
            <q-input v-if="birth" v-model="customBirth" tabindex="0" dense outlined disable
                     placeholder="YYYY-MM-DD"
                     class="q-my-sm q-mx-md component-outline-dash-input-mini-short" style="opacity: .8"/>
            <q-input v-else v-model="customBirth" tabindex="0" dense outlined mask="####-##-##"
                     placeholder="YYYY-MM-DD"
                     class="q-my-sm  q-mx-md component-outline-input-mini-short" style="opacity: .8"/>
          </div>

        </div>


        <h5>
          {{ $t('main_tools_cn_card_setting_gender') }}
        </h5>

        <div class="row justify-evenly items-center q-mb-md">

          <q-radio v-model="gender" checked-icon="task_alt" class="component-ratio-base"
                   unchecked-icon="panorama_fish_eye" val="random"
                   :label="$t('main_tools_cn_card_setting_gender_ram')"/>
          <q-radio v-model="gender" checked-icon="task_alt" class="component-ratio-base"
                   unchecked-icon="panorama_fish_eye" val="0"
                   :label="$t('main_tools_cn_card_setting_gender_female')"/>
          <q-radio v-model="gender" checked-icon="task_alt" class="component-ratio-base"
                   unchecked-icon="panorama_fish_eye" val="1"
                   :label="$t('main_tools_cn_card_setting_gender_male')"/>
          <q-radio v-model="gender" checked-icon="task_alt" class="component-ratio-base"
                   unchecked-icon="panorama_fish_eye" val="2"
                   :label="$t('main_tools_cn_card_setting_gender_heli')"/>
          <q-radio v-model="gender" checked-icon="task_alt" class="component-ratio-base"
                   unchecked-icon="panorama_fish_eye" val="3"
                   :label="$t('main_tools_cn_card_setting_gender_terr')"/>
          <q-radio v-model="gender" checked-icon="task_alt" class="component-ratio-base"
                   unchecked-icon="panorama_fish_eye" val="4"
                   :label="$t('main_tools_cn_card_setting_gender_candy')"/>
          <q-radio v-model="gender" checked-icon="task_alt" class="component-ratio-base"
                   unchecked-icon="panorama_fish_eye" val="5"
                   :label="$t('main_tools_cn_card_setting_gender_indefinable')"/>


        </div>


      </div>

    </div>

  </div>

</template>

<script setup>
import {notifyTopWarning} from "@/utils/notification-tools";
import {onMounted, ref} from "vue";
import {copy} from "@/utils/base-tools";
import {useI18n} from "vue-i18n";

const {t} = useI18n()


let showIdCardRet = ref(false)
let cityCode = ref("330102")
let customCityCode = ref("")
let gender = ref("random")
let birth = ref("random")
let customBirth = ref("2000-01-01")
let idCardList = ref([])


function generateIdCardList() {
  showIdCardRet.value = false
  idCardList.value.length = 0

  let count = 15
  while (count > 0) {
    let thisId = generateIdCard()
    if (thisId === '') {
      idCardList.value.length = 0
      break
    }
    idCardList.value.push({id: thisId})
    --count
  }

  showIdCardRet.value = true
}

function generateIdCard() {

  //cityCode
  let inputCityCode = customCityCode.value
  if (cityCode.value !== '') {
    inputCityCode = cityCode.value
  }

  //birth
  let yearNum = 1950
  let monthNum = 1
  let dayNum = 1
  if (birth.value === 'random') {
    yearNum = yearNum + Math.floor(Math.random() * (70));
    monthNum = monthNum + Math.floor(Math.random() * (12));
    dayNum = dayNum + Math.floor(Math.random() * (28));
  } else {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(customBirth.value)) {
      notifyTopWarning(t('main_tools_cn_card_setting_birth_error'))
      return ""
    }
    const inputDate = new Date(customBirth.value)
    if (isNaN(inputDate.getTime())) {
      notifyTopWarning(t('main_tools_cn_card_setting_birth_error'))
      return ""
    }
    const [year, month, day] = customBirth.value.split("-").map(Number);
    yearNum = year
    monthNum = month
    dayNum = day
    if (inputDate.getFullYear() !== year || inputDate.getMonth() + 1 !== month || inputDate.getDate() !== day) {
      notifyTopWarning(t('main_tools_cn_card_setting_birth_error'))
      return ""
    }
  }

  const year = yearNum
  const month = monthNum.toString().padStart(2, '0')
  const day = dayNum.toString().padStart(2, '0')

  let randomSerial;
  if (gender.value === '1') {
    randomSerial = Math.floor(Math.random() * 100).toString().padStart(2, '0')
        + (Math.floor(Math.random() * 5) * 2 + 1);
  } else if (gender.value === '0') {
    randomSerial = Math.floor(Math.random() * 100).toString().padStart(2, '0')
        + Math.floor(Math.random() * 5) * 2;
  } else if (gender.value === 'random') {
    randomSerial = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  } else {
    notifyTopWarning(t('main_tools_cn_card_setting_gender_error'))
    return ""
  }

  const id17 = `${inputCityCode}${year}${month}${day}${randomSerial}`;

  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const checkDigits = "10X98765432";

  let sum = 0;
  for (let i = 0; i < id17.length; i++) {
    sum += parseInt(id17[i]) * weights[i];
  }

  const checkIndex = sum % 11;
  const checkDigit = checkDigits[checkIndex];
  return id17 + checkDigit

}

onMounted(() => {
  generateIdCardList()
})


</script>

<style scoped lang="scss">

</style>