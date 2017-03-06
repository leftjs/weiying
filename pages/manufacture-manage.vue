<template>
  <div>
    <el-tabs v-model="currentTab">
      <el-tab-pane label="型号管理" name="typeManage">
        <div class="panel panel-success panel-container">
          <div class="panel-heading">
            <h3 class="panel-title">型号列表</h3>
          </div>
          <div class="panel-body">
            <el-table :data="typeList" border style="margin: 0 auto;">
              <el-table-column prop="code" label="型号编号" min-width="120">
                <template scope="scope">
                  <span class="ellipsis" style="width: 120px;">
                    {{ scope.row.code }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="unitPrice" label="加工单价"  min-width="100">
                <template scope="scope">
                  {{ scope.row.unitPrice }} 元
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="150">
                <template scope="scope">
                  <el-button
                    size="small"
                    @click="typeForm=Object.assign({},scope.row)">编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteItemFromDb('type', scope.row.id)">删除</el-button>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </div>
        <div class="panel panel-info panel-container" >
          <div class="panel-heading">
            <h3 class="panel-title">添加/更新型号</h3>
          </div>
          <div class="panel-body">
            <el-form class="form" :model="typeForm" :rules="typeRule" ref="typeForm" label-width="90px" label-position="right" >
              <el-form-item label="型号编号" prop="code">
                <el-input v-model="typeForm.code"></el-input>
              </el-form-item>
              <el-form-item label="加工单价" prop="unitPrice" required>
                <div class="numberWrapper">
                  <el-input-number v-model="typeForm.unitPrice" :step="0.05"></el-input-number><span>元</span>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('typeForm')">添加/更新</el-button>
                <el-button type="danger" @click="resetForm('typeForm')">重填</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="入库登记" name="markDown">
        <div class="panel panel-info panel-container">
          <div class="panel-heading">
            <h3 class="panel-title">入库记录</h3>
          </div>
          <div class="panel-body">
            <h2 style="text-align: center; margin-top: 0">{{ filterDate }}</h2>
            <el-table :data="recordList" border style="margin: 0 auto;" v-loading="tableLoading" element-loading-text="拼命加载中">
              <el-table-column prop="date" label="入库日期" min-width="130">
                <template scope="scope">
                  <el-icon name="time"></el-icon>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="count" label="入库数量" min-width="100">
                <template scope="scope">
                  {{ scope.row.count }} 个
                </template>
              </el-table-column>
              <el-table-column prop="grossWeight" label="毛重" min-width="100">
                <template scope="scope">
                  {{ scope.row.grossWeight }} kg
                </template>
              </el-table-column>
              <el-table-column prop="netWeight" label="净重" min-width="100">
                <template scope="scope">
                  {{ scope.row.netWeight }} kg
                </template>
              </el-table-column>

              <el-table-column prop="code" label="型号编号" min-width="120">
                <template scope="scope">
                  <span class="ellipsis" style="width: 120px;">
                    {{ scope.row.code }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="unitPrice" label="加工单价"  min-width="100">
                <template scope="scope">
                  {{ scope.row.unitPrice }} 元
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="150">
                <template scope="scope">
                  <el-button
                    size="small"
                    @click="editRecordForm(Object.assign({},scope.row))">编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteItemFromDb('record', scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="display: flex; justify-content: space-around; flex-wrap: wrap; margin-top: 20px;">
              <el-date-picker class="filterDate" v-model="date1" @change="dateString => {if (dateString === undefined) {return;} date2 = null; this.filterDate = dateString}" type="year" placeholder="请选择年" ></el-date-picker>
              <el-date-picker class="filterDate" v-model="date2" @change="dateString => {if (dateString === undefined) {return;} date1 = null; this.filterDate = dateString}" type="month" placeholder="请选择月" ></el-date-picker>

            </div>
          </div>
        </div>
        <div class="panel panel-success panel-container">
          <div class="panel-heading">
            <h3 class="panel-title">添加/更新入库记录</h3>
          </div>
          <div class="panel-body">
            <el-form class="form" :model="recordForm" :rules="recordRule" ref="recordForm" label-width="90px">
              <el-form-item label="入库日期" prop="date">
                <el-date-picker @change="(dateString) => {recordForm.date=convertDateToMilliseconds(dateString)}" v-model="selectDate" align="right" type="date" placeholder="选择日期" ></el-date-picker>
              </el-form-item>
              <el-form-item label="入库数量" prop="count" required>
                <div class="numberWrapper">
                  <el-input-number v-model="recordForm.count" :step="1"></el-input-number><span>个</span>
                </div>
              </el-form-item>
              <el-form-item label="毛重" prop="grossWeight" required>
                <div class="numberWrapper">
                  <el-input-number v-model="recordForm.grossWeight" :step="0.01"></el-input-number><span>kg</span>
                </div>
              </el-form-item>
              <el-form-item label="净重" prop="netWeight" required>
                <div class="numberWrapper">
                  <el-input-number v-model="recordForm.netWeight" :step="0.01"></el-input-number><span>kg</span>
                </div>
              </el-form-item>
              <el-form-item label="产品型号" prop="type">
                <el-select v-model="recordForm.type" filterable placeholder="请选择">
                  <el-option v-for="item in typeList" :label="`${item.code} - ${item.unitPrice}元`" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('recordForm')">添加/更新</el-button>
                <el-button type="danger" @click="resetForm('recordForm')">重填</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="设置" name="setting">
        <div class="panel panel-success panel-container">
          <div class="panel-heading">
            <h3 class="panel-title">设置</h3>
          </div>
          <div class="panel-body">
            <div style="display: flex; justify-content: center; align-items: center;" >
              <span>每月结账日</span>
              <el-select v-model="setting.settleDay" style="margin-left: 20px" @change="updateSetting(setting)">
                <el-option v-for="n in 28" :label="`${n} 日`" :value="n"></el-option>
              </el-select>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Promise, {promisify} from 'bluebird'
  import _ from 'lodash'
  import {formatFirstErrorCallback} from '../utils'
  export default {
    data() {
      const validateNotZero = (fieldName) => {
        return (rule, value, callback) => {
          if (!value) {
            return callback(new Error(`${fieldName}不能为0`))
          }else if (!(value > 0)) {
            return callback(new Error(`${fieldName}必须大于0`))
          }else {
            return callback()
          }
        }
      }
      return {
        filterDate: '',
        date1: '',
        date2: '',
        tableLoading: false,
        dateRange: {
          start: 0,
          end: 0
        },
        currentTab: 'markDown',
        setting: {
          settleDay: 25
        },
        typeForm: {
          //id: '',
          code: '',
          unitPrice: 0,
        },
        typeRule: {
          code: [
            { required: true, message: '请输入型号编号', trigger: 'change'}
          ],
          unitPrice: [
            {validator: validateNotZero('加工单价'), trigger: 'change'}
          ]
        },
        selectDate: null,
        typeList: [],
        recordList: [],
        recordForm: {
          date: '',
          type: '',
          count: 0,
          grossWeight: 0,
          netWeight: 0
        },
        recordRule: {
          date: [
            {required: true, type: 'number', message: '请选择入库日期', trigger: 'change'}
          ],
          type: [
            {required: true, message: '请选择产品型号', trigger: 'change'}
          ],
          count: [
            {validator: validateNotZero('入库数量'), trigger: 'change'}
          ],
          grossWeight: [
            {validator: validateNotZero('毛重'), trigger: 'change'}
          ],
          netWeight: [
            {validator: validateNotZero('净重'), trigger: 'change'}
          ]
        }
      }
    },
    middleware: ['authenticated'],
    mounted() {

      this.date2 = Date.now()

      this.createRef('type').orderByKey().on('value', (snapshot) => {
        this.typeList = _.map(snapshot.val(), (value, id) => {
          return {
            ...value,
            id
          }
        }) || []
      })

      this.createRef('setting').on('value', snapshot => {
        let setting = snapshot.val()
        if (setting === null) {
          this.updateSetting(this.setting)
        } else {
          this.setting = setting
        }
      })

    },
    methods: {
      editRecordForm(data) {
        this.selectDate = new Date(data.date)
        this.recordForm = {
          id: data.id,
          date: this.convertDateToMilliseconds(data.date),
          count: data.count,
          type: data.type,
          grossWeight: data.grossWeight,
          netWeight: data.netWeight
        }
      },
      toggleTableLoading() {
        this.tableLoading = !this.tableLoading
        return true
      },
      fetchRecordByStartAndEnd(dateRange) {

        const specificTypeRef = (id) => {
          return this.createRef(`type/${id}`)
        }
        const specificTypeListener = (id) => {
          const specificTypeInstance = specificTypeRef(id)
          return promisify(formatFirstErrorCallback(specificTypeInstance.once.bind(specificTypeInstance)))
        }

        this.createRef('record').orderByChild('date').startAt(dateRange.start).endAt(dateRange.end).once('value', (snapshot) => {
          Promise.all(_.map(snapshot.val(), async (value, id) => {
            let specificType = await specificTypeListener(value.type)('value')
            return {
              ...value,
              date: (new Date(value.date)).toLocaleDateString(),
              id,
              ...specificType.val(),
            }
          })).then(result => {
            this.recordList = result
          })
        })
      },
      updateSetting(setting) {
        this.createRef('setting').set(setting)
      },
      convertDateToMilliseconds(dateString) {
        let date = new Date(dateString)
        return date.getTime()
      },
      deleteItemFromDb(dbName, id) {
        this.createRef(dbName).child(id).remove().then(() => toastr.success('删除成功') && dbName === 'record' && this.fetchRecordByStartAndEnd(this.dateRange) ).catch(() => toastr.error('删除失败'))
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.toggleTableLoading()
            let id = this[formName].id
            let ref = this.createRef(/(.*)(Form)$/.exec(formName)[1])
            let entity = {...this[formName]}
            delete entity.id
            if (!id) {
              ref.push(entity).then(() => toastr.success('添加成功') && this.toggleTableLoading() && formName === 'recordForm' && this.fetchRecordByStartAndEnd(this.dateRange)).catch(() => toastr.error('添加失败') && this.toggleTableLoading())
            }else {
              ref.update({[id]: entity}).then(() => toastr.success('更新成功') && this.toggleTableLoading() && formName === 'recordForm' && this.fetchRecordByStartAndEnd(this.dateRange)).catch(() => toastr.error('更新失败') && this.toggleTableLoading())
            }
            this.resetForm(formName)
          } else{
            toastr.error('请核对无误再提交')
            return false
          }
        })

      },
      resetForm(formName) {
        delete this[formName].id
        this.$refs[formName].resetFields()
        if (formName === 'recordForm') {
          this.selectDate = null
        }
      },
      createRef(path) {
        return this.$firebase.database().ref(`${this.loggedUser.uid}/${path}`)
      },
      queryTypeAsync(queryString, cb) {
        let pre = this.typeList
        cb(pre.filter((item) => {
          return item.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
        }))
      }
    },
    computed: {
      ...mapGetters(['loggedUser'])
    },
    watch: {
      filterDate() {
        if (this.filterDate.indexOf('-') > -1 ) {
          // 按月
          let arr = /(.*)-(.*)/.exec(this.filterDate)
          let year = parseInt(arr[1])
          let month = parseInt(arr[2])
          this.dateRange.end = new Date(`${year}-${month}-${this.setting.settleDay}`).getTime()
          if (month === 1) {
            this.dateRange.start =  new Date(`${year - 1}-12-${this.setting.settleDay + 1}`).getTime()
          }else {
            this.dateRange.start = new Date(`${year}-${month -1}-${this.setting.settleDay + 1}`).getTime()
          }
        }else {
          // 按年
          let year = parseInt(this.filterDate)
          this.dateRange.start = new Date(`${year}-1-1`).getTime()
          this.dateRange.end = new Date(`${year}-12-31`).getTime()
        }
        this.fetchRecordByStartAndEnd(this.dateRange)
      }
    }
  }
</script>


<style scoped lang="scss" rel="stylesheet/scss">
  .panel-container {
    max-width: 50vw;
    min-width: 320px;
    margin: 20px auto 0;
  }
  .numberWrapper {
    display: flex;
    justify-content: flex-start;
    span {
      margin-left: 10px;
      font-size: 1.5rem;
      color: grey;
    }
  }
  .ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .filterDate {
    margin: 5px;
  }
</style>
