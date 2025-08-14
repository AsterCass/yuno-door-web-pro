<template>

  <div class="q-mx-xl">

    <h4>
      {{ $t('main_tools_title_sql_kotlin') }}
    </h4>

    <div class="row">
      <div class="col-md-6 col-12">

        <cask-long-text-input-simple v-model:value="inputDDl" input-height="32rem"/>

      </div>
      <div class="col-md-6 col-12 q-px-xl">

        <h5>
          {{ $t('main_tools_sql_kotlin_package') }}
        </h5>

        <div>
          <cask-long-text-input-simple v-model:value="packageName"/>
        </div>

        <h5>
          {{ $t('main_tools_sql_kotlin_date') }}
        </h5>

        <div class="row justify-evenly">
          <q-radio v-model="isLocalDateTime" :val="1" label="LocalDateTime"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
          <q-radio v-model="isLocalDateTime" :val="0" label="Date"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
        </div>

        <h5>
          {{ $t('main_tools_sql_kotlin_comment') }}
        </h5>

        <div class="row justify-evenly">
          <q-radio v-model="isNeedComment" :val="1" :label="$t('main_setting_yes')"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
          <q-radio v-model="isNeedComment" :val="0" :label="$t('main_setting_no')"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
        </div>

        <h5>
          {{ $t('main_tools_sql_kotlin_camel') }}
        </h5>

        <div class="row justify-evenly">
          <q-radio v-model="isCamelCase" :val="1" :label="$t('main_setting_yes')"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
          <q-radio v-model="isCamelCase" :val="0" :label="$t('main_setting_no')"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
        </div>

        <h5>
          {{ $t('main_tools_sql_kotlin_float') }}
        </h5>

        <div class="row justify-evenly">
          <q-radio v-model="isBigDecimal" :val="1" label="BigDecimal"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
          <q-radio v-model="isBigDecimal" :val="0" label="Double"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
        </div>

        <h5>
          {{ $t('main_tools_sql_kotlin_null') }}
        </h5>

        <div class="row justify-evenly">
          <q-radio v-model="isAllNullable" :val="1" label="Type?"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
          <q-radio v-model="isAllNullable" :val="0" label="Auto"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
        </div>

        <h5>
          {{ $t('main_tools_sql_kotlin_default') }}
        </h5>

        <div class="row justify-evenly">
          <q-radio v-model="isSetDefaultValue" :val="1" :label="$t('main_setting_yes')"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
          <q-radio v-model="isSetDefaultValue" :val="0" :label="$t('main_setting_no')"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
        </div>


      </div>

      <div class="col-md-6 col-12">
        <div class="row justify-center">
          <q-btn no-caps unelevated class="shadow-2 component-full-btn-std"
                 @click="generateSql2KotlinCode">
            <div class="row items-center">
              <div class="q-mx-xs">
                {{ $t('main_tools_generate') }}
              </div>
            </div>
          </q-btn>
        </div>

        <div v-show="generated" class="component-marked-view">

          <div class="row justify-end">
            <q-btn no-caps unelevated class="component-full-btn-mini-grow"
                   style="transform: translateY(3rem)"
                   @click="copy(kotlinDataClassCode)">
              <div class="row items-center">
                <div class="q-mx-xs">
                  {{ $t('main_chat_operation_copy') }}
                </div>
              </div>
            </q-btn>
          </div>


          <div ref="articleMainContent">
            <div v-html="generateResultMarkdownToHtml"></div>
          </div>


        </div>
      </div>
    </div>


  </div>

</template>

<script setup>
import CaskLongTextInputSimple from "@/ui/components/CaskLongTextInputSimple.vue";
import {computed, onMounted, ref} from "vue";
import {convertOptions, ddlConvertKotlinDataClass, defaultSql} from "@/utils/ddl-to-kotlin";
import {importStyle, importStyleLight, marked} from "@/utils/marked-tools";
import {useGlobalStateStore} from "@/utils/global-state";
import {copy} from "@/utils/base-tools";
import {notifyTopPositive, notifyTopWarning} from "@/utils/notification-tools";
import {useI18n} from "vue-i18n";

const globalState = useGlobalStateStore();
const {t} = useI18n()

const inputDDl = ref(defaultSql)
const packageName = ref("com.aster.extend")
const isLocalDateTime = ref(0)
const isNeedComment = ref(1)
const isBigDecimal = ref(1)
const isCamelCase = ref(1)
const isAllNullable = ref(0)
const isSetDefaultValue = ref(1)

let generated = ref(false)
let kotlinDataClassCode = ref("")
let kotlinDataClassCodeHtml = ref("")

const generateResultMarkdownToHtml = computed(() => {
  return marked.parse(kotlinDataClassCodeHtml.value)
})

function generateSql2KotlinCode() {
  if (!inputDDl.value) {
    notifyTopWarning(t('main_tools_sql_kotlin_error_empty_sql'))
    return
  }
  if (!packageName.value) {
    notifyTopWarning(t('main_tools_sql_kotlin_error_empty_package'))
    return
  }

  convertOptions.packageName = packageName.value
  convertOptions.isLocalDateTime = isLocalDateTime.value
  convertOptions.isNeedComment = isNeedComment.value
  convertOptions.isBigDecimal = isBigDecimal.value
  convertOptions.isCamelCase = isCamelCase.value
  convertOptions.isAllNullable = isAllNullable.value
  convertOptions.isSetDefaultValue = isSetDefaultValue.value


  kotlinDataClassCode.value = ddlConvertKotlinDataClass(inputDDl.value)
  if (kotlinDataClassCode.value) {
    kotlinDataClassCodeHtml.value = `\`\`\`kotlin\n${kotlinDataClassCode.value}\n\`\`\``
    notifyTopPositive(t('main_tools_sql_kotlin_success'))
    generated.value = true
  } else {
    notifyTopWarning(t('main_tools_sql_kotlin_error'))
    generated.value = false
  }

}


onMounted(() => {
  //随机导入code样式
  if (globalState.curThemeName === 'dark') {
    importStyle()
  } else {
    importStyleLight()
  }
})

</script>

<style scoped lang="scss">

</style>