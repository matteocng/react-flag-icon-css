# Snapshot report for `src/__tests__/internals.test.js`

The actual snapshot is saved in `internals.test.js.snap`.

Generated by [AVA](https://ava.li).

## makeFlagIcons

> Snapshot 1

    <div>
      <span
        className="flag-icon flag-icon-it flag-icon-flip-horizontal"
      />
      <span
        className="__MODULE__flag-icon __MODULE__flag-icon-es __MODULE__flag-icon-rotate-60"
      />
    </div>

## restoreClassNamesInTree

> Snapshot 1

    {
      children: {
        props: {
          className: 'some-other-class ipsum',
        },
        type: 'span',
      },
      props: {
        className: 'some-class',
        lorem: 'ipsum',
      },
      type: 'div',
    }