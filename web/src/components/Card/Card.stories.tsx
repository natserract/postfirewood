import { parseDate } from 'src/utils/date'
import Grid from '@material-ui/core/Grid'
import Card from './Card'
import { action } from '@storybook/addon-actions'
import data from './Card.stories.data'

export const SingleItem = () => {
  return (
    <Card
      title="Card"
      date={parseDate('2021-11-11 17:09:34.306')}
      onClick={action('clicked')}
      onDelete={action('deleted')}
    />
  )
}

export const ListItems = () => {
  return (
    <Grid container spacing={3} alignItems="stretch">
      {data &&
        data.map((item, index) => (
          <Grid item xs={12} sm={3} key={`item-${item.id}-${index}`}>
            <Card
              title={item?.title}
              date={parseDate(item?.createdAt)}
              onClick={action('clicked')}
              onDelete={action('deleted')}
            />
          </Grid>
        ))}
    </Grid>
  )
}

export default {
  title: 'Components/Card',
}
