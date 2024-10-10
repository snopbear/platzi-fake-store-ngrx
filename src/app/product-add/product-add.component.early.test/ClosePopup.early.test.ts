
// Unit tests for: ClosePopup


import { ProductAddComponent } from '../product-add.component';



// Mock classes
class MockFormGroup {
  public value = {
    id: 0,
    title: '',
    price: '',
    description: ''
  };
  public valid = true;
  public setValue = jest.fn();
}

class MockFormBuilder {
  public group = jest.fn().mockReturnValue(new MockFormGroup() as any);
}

class MockMatDialogRef {
  public close = jest.fn();
}

class MockStore {
  public dispatch = jest.fn();
  public select = jest.fn().mockReturnValue({
    subscribe: jest.fn()
  });
}

describe('ProductAddComponent.ClosePopup() ClosePopup method', () => {
  let component: any;
  let mockFormBuilder: MockFormBuilder;
  let mockMatDialogRef: MockMatDialogRef;
  let mockStore: MockStore;

  beforeEach(() => {
    mockFormBuilder = new MockFormBuilder();
    mockMatDialogRef = new MockMatDialogRef();
    mockStore = new MockStore();

    component = new ProductAddComponent(
      mockFormBuilder as any,
      mockMatDialogRef as any,
      { title: 'Test Title' } as any,
      mockStore as any
    );
  });

  describe('Happy Path', () => {
    it('should close the dialog when ClosePopup is called', () => {
      // Arrange
      // Act
      component.ClosePopup();

      // Assert
      expect(mockMatDialogRef.close).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple calls to ClosePopup gracefully', () => {
      // Arrange
      // Act
      component.ClosePopup();
      component.ClosePopup();

      // Assert
      expect(mockMatDialogRef.close).toHaveBeenCalledTimes(2);
    });
  });
});

// End of unit tests for: ClosePopup
