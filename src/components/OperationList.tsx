import { Button, NonIdealState } from '@blueprintjs/core'

import { UseOperationsParams, useOperations } from 'apis/query'
import { ComponentType, useMemo } from 'react'

import { toCopilotOperation } from '../models/converter'
import { CopilotDocV1 } from '../models/copilot.schema'
import { OperationListItem } from '../models/operation'
import { OperationCard } from './OperationCard'
import { withSuspensable } from './Suspensable'

export const OperationList: ComponentType<UseOperationsParams> =
  withSuspensable(
    (props) => {
      const { operations, size, setSize, isValidating, isReachingEnd } =
        useOperations({ ...props, suspense: true })

      const docCache = useMemo(
        () => new WeakMap<OperationListItem, CopilotDocV1.Operation>(),
        [],
      )
      const operationsWithDoc = operations.map((operation) => {
        let doc = docCache.get(operation)
        if (!doc) {
          doc = toCopilotOperation(operation)
          docCache.set(operation, doc)
        }
        return { operation, doc }
      })

      return (
        <>
          {operationsWithDoc.map(({ operation, doc }) => (
            <OperationCard
              operation={operation}
              operationDoc={doc}
              key={operation.id}
            />
          ))}

          {isReachingEnd && operations.length === 0 && (
            <NonIdealState
              icon="slash"
              title="没有找到任何作业"
              description="(つД｀)･ﾟ･"
            />
          )}

          {isReachingEnd && operations.length !== 0 && (
            <div className="mt-8 w-full tracking-wider text-center select-none text-slate-500">
              已经到底了哦 (ﾟ▽ﾟ)/
            </div>
          )}

          {!isReachingEnd && (
            <Button
              loading={isValidating}
              text="加载更多"
              icon="more"
              className="mt-2"
              large
              fill
              onClick={() => setSize(size + 1)}
            />
          )}
        </>
      )
    },
    {
      retryOnChange: ['orderBy', 'document', 'levelKeyword', 'operator'],
    },
  )
