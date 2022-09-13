import { EditorFieldProps } from 'components/editor/EditorFieldProps'
import { EditorIntegerInput } from 'components/editor/EditorIntegerInput'
import { SetOptional } from 'type-fest'
import { FormField2 } from '../../FormField'

interface EditorActionExecPredicateProps
  extends SetOptional<EditorFieldProps<CopilotDocV1.Action, number>, 'name'> {}

export const EditorActionExecPredicateKills = ({
  name = 'kills',
  control,
  rules,
  error,
}: EditorActionExecPredicateProps) => (
  <FormField2
    label="击杀数条件"
    className="mr-2 lg:mr-4"
    field={name}
    error={error}
    description="击杀数条件，如果没达到就一直等待。可选，默认为 0，直接执行"
  >
    <EditorIntegerInput
      NumericInputProps={{ placeholder: '击杀数' }}
      control={control}
      name={name}
      rules={rules}
    />
  </FormField2>
)

export const EditorActionExecPredicateCostChange = ({
  name = 'costChanges',
  control,
  rules,
  error,
}: EditorActionExecPredicateProps) => (
  <FormField2
    label="费用变化量条件"
    field={name}
    error={error}
    description="费用变化量，如果没达到就一直等待。可选，默认为 0，直接执行。注意：费用变化量是从开始执行本动作时开始计算的（即：使用前一个动作结束时的费用作为基准）；另外仅在费用是两位数的时候识别的比较准，三位数的费用可能会识别错，不推荐使用"
  >
    <EditorIntegerInput
      NumericInputProps={{ placeholder: '费用变化量' }}
      control={control}
      name={name}
      rules={rules}
    />
  </FormField2>
)
