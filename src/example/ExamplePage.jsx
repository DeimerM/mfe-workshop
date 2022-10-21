import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, TextFilter, DataTable, CardView, Card, Alert, Button, ProductTour
} from '@edx/paragon';

import { fetchCourses } from './data';

const CourseCard = ({ className, original }) => {
  const {
    id, name, org, start, end, media,
  } = original;

  return (
    <Card className={className}>
      <Card.ImageCap src={media.image.small} srcAlt="Course image" />
      <Card.Header
        title={name}
        subtitle={org}
      />
      <Card.Section>
        <ul>
          <li>ID: {id}</li>
          <li>Start Date: {start} - End Date: {end} </li>
        </ul>
      </Card.Section>
    </Card>
  );
};
const myFirstTour = {
  tourId: 'myFirstTour',
  advanceButtonText: 'Next',
  dismissButtonText: 'Dismiss',
  endButtonText: 'Okay',
  enabled: true,
  onDismiss: () => setIsTourEnabled(false),
  onEnd: () => setIsTourEnabled(false),
  checkpoints: [
    {
      advanceButtonText: 'Onward', // Override the default advanceButtonText above
      body: "Here's the first checkpoint!",
      placement: 'top',
      target: '#checkpoint-1',
      title: 'First checkpoint',
    },
    {
      body: "Here's the second checkpoint!",
      onDismiss: () => {
        console.log('Dismissed the second checkpoint');
        setIsTourEnabled(false);
      }, // Override the default onDismiss above
      placement: 'right',
      target: '#checkpoint-2',
      title: 'Second checkpoint',
    },
    {
      body: "Here's the third checkpoint!",
      placement: 'bottom',
      target: '#checkpoint-3',
      title: 'Third checkpoint',
    }
  ],
};
const CoursesTable = ({ data }) => {
  const [currentView, setCurrentView] = useState('card');
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Organization',
      accessor: 'org',
    },
    {
      Header: 'Course Name',
      accessor: 'name',
    },
    {
      Header: 'Start Date',
      accessor: 'start',
    },
    {
      Header: 'End Date',
      accessor: 'end',
    },
  ];

  return (
    <DataTable
      itemCount={data.length}
      data={data}
      columns={columns}
      isSortable
      isFilterable
      defaultColumnValues={{ Filter: TextFilter }}
      dataViewToggleOptions={{
        isDataViewToggleEnabled: true,
        onDataViewToggle: val => setCurrentView(val),
        defaultActiveStateValue: 'card',
      }}
    >
 
    
<ProductTour
          tours={[myFirstTour]}
        />
        <Button onClick={() => setIsTourEnabled(true)}>Open a product tour</Button>
        <Row className="w-100 m-0 mt-3 p-2 justify-content-around">
          <div id="checkpoint-1"></div>
          <div id="checkpoint-2"></div>
          <div id="checkpoint-3"></div>
        </Row>
<Alert
    variant="danger"
    actions={[
      <Button>Hello</Button>,
    ]}
    dismissible
    onClose={(e) => { console.log('closed', e); } }
    stacked
  >
    <Alert.Heading>Hey, nice to see you</Alert.Heading>
    <p>
      Aww yeah, you successfully read this important alert message. This example
      text is going to run a bit longer so that you can see how spacing within an
      alert works with this kind of content.
    </p>
  </Alert>

      <DataTable.TableControlBar />
      { currentView === 'list' && <DataTable.Table /> }
      { currentView === 'card' && <CardView CardComponent={CourseCard} /> }
      <DataTable.EmptyTable content="No results found." />
      <DataTable.TableFooter />
    </DataTable>
  );
};

export default function ExamplePage() {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <Container>
      <Row className="justify-content-center m-4 custom-row">
        <Col>
          <CoursesTable data={data.results} />
        </Col>
      </Row>
    </Container>
  );
}

CourseCard.propTypes = {
  className: PropTypes.string,
  original: PropTypes.objectOf(PropTypes.any),
};

CourseCard.defaultProps = {
  className: '',
  original: {},
};

CoursesTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape([])),
};

CoursesTable.defaultProps = {
  data: [],
};