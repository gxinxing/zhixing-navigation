import { JobTemplate } from '@/types';

export const jobTemplates: JobTemplate[] = [
  {
    id: 'supermarket',
    name: '超市理货员',
    icon: '🛒',
    tasks: [
      {
        id: 'shelf-stocking',
        name: '商品上架',
        icon: '📦',
        steps: [
          {
            order: 1,
            title: '拿到新商品',
            description: '从箱子里拿出一个商品，一次只拿一个',
            tip: '一次只拿一个',
          },
          {
            order: 2,
            title: '看标签上的数字',
            description: '找到包装上的数字标签，在条形码旁边',
            tip: '数字一般有4位',
          },
          {
            order: 3,
            title: '找到对应货架',
            description: '根据数字找到货架上一样的数字',
          },
          {
            order: 4,
            title: '检查商品日期',
            description: '看生产日期，新的放后面',
          },
          {
            order: 5,
            title: '把旧商品往前移',
            description: '把架上的旧商品挪到最外面',
          },
          {
            order: 6,
            title: '新商品放后面',
            description: '把新拿的商品放在旧商品后面',
          },
          {
            order: 7,
            title: '商标朝外摆正',
            description: '所有商品的正面朝外，摆整齐',
          },
          {
            order: 8,
            title: '检查数量对不对',
            description: '看看数量是不是和规定的一样',
          },
          {
            order: 9,
            title: '空纸箱折叠放好',
            description: '把空箱子折好放到指定位置',
          },
          {
            order: 10,
            title: '检查完成',
            description: '看一遍，确认都做好了',
          },
        ],
      },
    ],
  },
  {
    id: 'coffee-shop',
    name: '咖啡店助理',
    icon: '☕',
    tasks: [
      {
        id: 'make-americano',
        name: '制作美式咖啡',
        icon: '☕',
        steps: [
          {
            order: 1,
            title: '准备杯子',
            description: '拿一个中号纸杯放在台面上',
          },
          {
            order: 2,
            title: '放好杯盖架',
            description: '把杯子放在咖啡机出液口下面',
          },
          {
            order: 3,
            title: '选择"美式咖啡"',
            description: '在屏幕上按"美式咖啡"按钮',
          },
          {
            order: 4,
            title: '选择杯型"中杯"',
            description: '按"中杯"按钮',
          },
          {
            order: 5,
            title: '按下开始',
            description: '按绿色"开始"按钮',
          },
          {
            order: 6,
            title: '等待完成',
            description: '看屏幕显示"完成"，不要提前拿走',
            tip: '耐心等待',
          },
          {
            order: 7,
            title: '盖上杯盖',
            description: '拿一个杯盖盖好',
          },
          {
            order: 8,
            title: '贴上标签',
            description: '用标签机打标签贴在杯子上',
          },
        ],
      },
    ],
  },
  {
    id: 'library',
    name: '图书管理员',
    icon: '📚',
    tasks: [
      {
        id: 'book-shelving',
        name: '图书上架',
        icon: '📚',
        steps: [
          {
            order: 1,
            title: '看书背上的编号',
            description: '翻到书脊上的白色标签，看上面的数字',
          },
          {
            order: 2,
            title: '找到对应书架',
            description: '根据数字找到标着相同范围的书架',
          },
          {
            order: 3,
            title: '找到正确位置',
            description: '在书架上找到和这本书编号最近的位置',
          },
          {
            order: 4,
            title: '书脊朝外',
            description: '书的书脊（有字的一面）朝外',
          },
          {
            order: 5,
            title: '竖直放好',
            description: '书要竖直放，不要歪斜',
          },
          {
            order: 6,
            title: '和旁边的书齐平',
            description: '推一推，和旁边的书一样齐',
          },
          {
            order: 7,
            title: '确认放对了',
            description: '看一下编号，两边书的编号是否连得上',
          },
        ],
      },
    ],
  },
  {
    id: 'hotel',
    name: '酒店客房',
    icon: '🏨',
    tasks: [
      {
        id: 'room-cleaning',
        name: '清洁整理',
        icon: '🧹',
        steps: [
          {
            order: 1,
            title: '敲门确认无人',
            description: '敲三下门，等5秒，确认房间没人',
          },
          {
            order: 2,
            title: '开灯开窗',
            description: '打开所有灯，拉开窗帘',
          },
          {
            order: 3,
            title: '收集垃圾',
            description: '把垃圾桶里的垃圾袋系好拿出来',
          },
          {
            order: 4,
            title: '换新垃圾袋',
            description: '套上新垃圾袋，边翻进去',
          },
          {
            order: 5,
            title: '撤走脏布草',
            description: '把床单、被套、枕套全部拆下来',
          },
          {
            order: 6,
            title: '铺新床单',
            description: '先铺床单，四角塞好',
          },
          {
            order: 7,
            title: '套被子和枕头',
            description: '套好被套和枕套，铺整齐',
          },
          {
            order: 8,
            title: '擦浴室台面',
            description: '用抹布擦洗手台和镜子',
          },
          {
            order: 9,
            title: '补充洗浴用品',
            description: '放好洗发水、沐浴露、牙刷套装',
          },
          {
            order: 10,
            title: '擦桌子椅子',
            description: '用抹布擦桌面和椅子',
          },
          {
            order: 11,
            title: '吸尘拖地',
            description: '先吸尘再拖地，从里往外',
          },
          {
            order: 12,
            title: '最后检查',
            description: '环顾一圈，确认都做好了，关灯关门',
          },
        ],
      },
    ],
  },
  {
    id: 'office',
    name: '办公室助理',
    icon: '🏢',
    tasks: [
      {
        id: 'print-document',
        name: '打印文件',
        icon: '🖨️',
        steps: [
          {
            order: 1,
            title: '打开文件',
            description: '在电脑上双击要打印的文件',
          },
          {
            order: 2,
            title: '点击"文件"菜单',
            description: '点左上角的"文件"两个字',
          },
          {
            order: 3,
            title: '点击"打印"',
            description: '在菜单里找到"打印"按钮点一下',
          },
          {
            order: 4,
            title: '检查打印机名称',
            description: '看上面显示的打印机名称对不对',
          },
          {
            order: 5,
            title: '按打印按钮',
            description: '点右下角的"打印"按钮',
          },
          {
            order: 6,
            title: '取出文件',
            description: '到打印机那里拿出打印好的纸',
          },
        ],
      },
    ],
  },
];
