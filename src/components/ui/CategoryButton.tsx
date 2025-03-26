import { Button, Box } from '@mui/material';


type VariantType = 'Work' | 'Personal';

const CategoryButton = ({ variant, selected, onSelect }: { 
  variant: VariantType; 
  selected: boolean; 
  onSelect: () => void;
}) => {
  return (
    <Button
      onClick={onSelect}
      sx={{
        width: '79px',
        height: '30px',
        color: selected ? '#FFFFFF' : '#090909',
        backgroundColor: selected ? '#7B1984' : '#FFFFFF',
        border: '1px solid #00000030',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: selected ? '#7B1984' : '#f0f0f0',
        },
      }}
    >
      {variant}
    </Button>
  );
};

const CategoryButtonGroup = ({selectedCategory, onSelectCategory}: {
  
    selectedCategory: VariantType | null;
    onSelectCategory: (category: VariantType) => void;
  
}) => {

  return (
    <Box display="flex" gap={2}>
      <CategoryButton 
        variant="Work" 
        selected={selectedCategory === "Work"}
        onSelect={() => onSelectCategory("Work")}
      />
      <CategoryButton 
        variant="Personal" 
        selected={selectedCategory === "Personal"}
        onSelect={() => onSelectCategory("Personal")}
      />
    </Box>
  );
};

export default CategoryButtonGroup;
