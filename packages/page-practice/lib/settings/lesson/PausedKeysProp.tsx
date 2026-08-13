import { lessonProps } from "@keybr/lesson";
import { useSettings } from "@keybr/settings";
import { CheckBox, Field, FieldList } from "@keybr/widget";
import { type ReactNode } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export function PausedKeysProp({
  letters,
}: {
  readonly letters: readonly { readonly label: string }[];
}): ReactNode {
  const { formatMessage } = useIntl();
  const { settings, updateSettings } = useSettings();
  const pausedKeys = settings.get(lessonProps.guided.pausedKeys);
  const paused = new Set(pausedKeys);

  return (
    <FieldList>
      <Field>
        <FormattedMessage id="t_Paused_keys" defaultMessage="Paused keys:" />
      </Field>
      <Field>
        {letters.map((letter) => {
          const isPaused = paused.has(letter.label);
          return (
            <CheckBox
              key={letter.label}
              label={letter.label.toUpperCase()}
              title={formatMessage(
                {
                  id: "settings.pausedKeys.toggle",
                  defaultMessage: "Pause or resume {key}",
                },
                { key: letter.label.toUpperCase() },
              )}
              checked={isPaused}
              onChange={(value) => {
                const next = new Set(paused);
                if (value) {
                  next.add(letter.label);
                } else {
                  next.delete(letter.label);
                }
                updateSettings(
                  settings.set(
                    lessonProps.guided.pausedKeys,
                    [...next].join(""),
                  ),
                );
              }}
            />
          );
        })}
      </Field>
    </FieldList>
  );
}
